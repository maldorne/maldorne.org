---
title: 'Implementing PROXY protocol in MUD drivers'
date: 2026-04-14 22:00:00
author: neverbot
tags:
  - mudos
  - ldmud
  - dgd
  - docker
  - traefik
  - mud
  - infrastructure
  - networking
categories:
  - infrastructure
---

> This is a technical post about preserving real client IPs when running MUD servers behind reverse proxies in Docker containers.

If you run MUD servers inside Docker containers behind a reverse proxy like [Traefik](https://traefik.io/), [HAProxy](https://www.haproxy.org/) or [nginx](https://nginx.org/), you've probably noticed that every player connection appears to come from the same internal IP address — the proxy's container IP. This breaks IP-based features like login logs, anti-multiplay checks, IP banning, and anything else that relies on `query_ip_number()` or its equivalent.

This post explains the problem, why it happens, and how we solved it by adding [PROXY protocol](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) v1 support to the MUD drivers we use at [Maldorne](https://maldorne.org).

<!-- more -->

## The problem

In a traditional MUD setup, the driver listens directly on a public port. When a player connects, the OS tells the driver their real IP address via `accept()` + `getpeername()`.

In a containerized setup with a reverse proxy, the traffic flow is:

```
Player (198.51.100.42) → Traefik (public port) → MUD container (internal port)
```

Traefik terminates the TCP connection from the player and opens a new one to the MUD. The MUD's `accept()` sees only Traefik's internal Docker IP (e.g. `172.18.0.2`), not the player's. The same happens with WebSocket-to-telnet proxies used by browser-based MUD clients.

The result: every player appears to connect from the same IP, making login logs useless and IP-based security impossible.

## The solution: PROXY protocol

[PROXY protocol](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) is a simple, widely adopted standard created by the HAProxy team. When enabled, the reverse proxy prepends a single ASCII line to the TCP stream before any application data:

```
PROXY TCP4 198.51.100.42 203.0.113.10 49152 5000\r\n
```

The backend reads this line, extracts the real client IP, and processes the rest of the stream normally. The format is human-readable (v1) and trivial to parse. A good overview: [Exploring the PROXY Protocol](https://seriousben.com/posts/2020-02-exploring-the-proxy-protocol/).

Most modern reverse proxies can send PROXY protocol headers:

- **Traefik**: via [TCP serversTransport](https://doc.traefik.io/traefik/reference/routing-configuration/tcp/serverstransport/) with `proxyProtocol.version: 1`
- **HAProxy**: via `send-proxy` or `send-proxy-v2` on the `server` line
- **nginx**: via `proxy_protocol on` in a `stream` block

The missing piece is support on the receiving side — the MUD driver.

## Configuring Traefik

Since Traefik v3.5.2, the `proxyProtocol` option [moved from the load balancer to TCP serversTransport](https://doc.traefik.io/traefik/migrate/v3/#deprecation-of-proxyprotocol-option). Define a transport in a dynamic configuration file:

```yaml
# traefik/dynamic.yml
tcp:
  serversTransports:
    proxyv1:
      proxyProtocol:
        version: 1
```

Mount the file and enable the file provider in your compose:

```yaml
services:
  traefik:
    volumes:
      - ./traefik/dynamic.yml:/etc/traefik/dynamic.yml:ro
    command:
      - --providers.file.filename=/etc/traefik/dynamic.yml
      # ... other flags
```

Then reference the transport from each MUD service via Docker labels:

```yaml
labels:
  - traefik.tcp.services.myservice.loadbalancer.serversTransport=proxyv1@file
```

## MudOS

We added PROXY protocol v1 support to our [MudOS fork](https://github.com/maldorne/mudos) (branches `v22.2-maldorne` and `v21.7-maldorne`). The patch is in `driver/comm.c`, inside the `new_user_handler()` function, right after the `accept()` call stores the peer address.

The logic:

1. `MSG_PEEK` the first bytes of the new connection.
2. If they start with `"PROXY "`, find the line terminator and validate that it ends with `\r\n` (per the spec).
3. `sscanf` the five fields (`proto`, `src_ip`, `dst_ip`, `src_port`, `dst_port`).
4. Dispatch by `proto`: `TCP4` → parse the IPv4 source and overwrite the stored client address; `TCP6` → log a warning and ignore (our fork is built without IPv6); anything else (including `UNKNOWN`) → drop the header per the spec.
5. If the connection does not start with `"PROXY "`, do nothing — backwards compatible with direct connections.

One subtlety: the socket is non-blocking at the point where we peek, so `recv(MSG_PEEK)` can return `EWOULDBLOCK` if the PROXY header hasn't arrived yet from the reverse proxy. To avoid this race condition, we use `select()` with a 100ms timeout before peeking, giving the proxy enough time to send the header without blocking the driver indefinitely.

The feature is controlled by `#define SUPPORT_PROXY_PROTOCOL` in `driver/local_options`, following MudOS conventions for compile-time options.

### The patch

In `driver/comm.c`, after the line that copies the peer address into the user struct:

```c
memcpy((char *) &all_users[i]->addr, (char *) &addr, length);
```

Add:

```c
#ifdef SUPPORT_PROXY_PROTOCOL
{
    char proxy_buf[108]; /* v1 max line length */
    int n;
    fd_set readfds;
    struct timeval tv;

    /* The socket is non-blocking at this point, so MSG_PEEK can
     * return EWOULDBLOCK if the PROXY header hasn't arrived yet.
     * Use select() with a short timeout to wait for data first.
     */
    FD_ZERO(&readfds);
    FD_SET(new_socket_fd, &readfds);
    tv.tv_sec = 0;
    tv.tv_usec = 100000; /* 100ms timeout */

    n = select(new_socket_fd + 1, &readfds, NULL, NULL, &tv);
    if (n > 0)
        n = recv(new_socket_fd, proxy_buf, sizeof(proxy_buf) - 1, MSG_PEEK);
    else
        n = 0;

    if (n >= 6 && memcmp(proxy_buf, "PROXY ", 6) == 0) {
        char *end = (char *)memchr(proxy_buf, '\n', n);
        /* spec requires CRLF terminator; reject bare LF */
        if (end && end > proxy_buf && *(end - 1) == '\r') {
            int hdr_len = (end - proxy_buf) + 1;
            char proto[6], src_ip[46], dst_ip[46];
            int src_port, dst_port;

            /* consume the header from the socket */
            recv(new_socket_fd, proxy_buf, hdr_len, 0);
            proxy_buf[hdr_len] = '\0';

            if (sscanf(proxy_buf, "PROXY %5s %45s %45s %d %d",
                       proto, src_ip, dst_ip, &src_port, &dst_port) == 5) {
                if (strcmp(proto, "TCP4") == 0) {
                    struct in_addr real_addr;
                    if (inet_aton(src_ip, &real_addr)) {
                        all_users[i]->addr.sin_addr = real_addr;
                        all_users[i]->addr.sin_port = htons((unsigned short)src_port);
                        addr.sin_addr = real_addr;
                    }
                } else if (strcmp(proto, "TCP6") == 0) {
                    debug(connections, ("PROXY protocol: received TCP6 address %s but driver was compiled without IPv6 support, ignoring.\n", src_ip));
                }
                /* else: UNKNOWN or unrecognized proto, drop header per spec */
            }
        }
    }
}
#endif
```

And in `driver/local_options`:

```c
#define SUPPORT_PROXY_PROTOCOL
```

That's it. `query_ip_number()` and `query_ip_name()` will now return the real client IP for proxied connections, and work exactly as before for direct connections.

## LDMud

We added PROXY protocol v1 support to our [LDMud fork](https://github.com/maldorne/ldmud) (branch `3.6.8-maldorne`) and submitted a [pull request to the official LDMud repository](https://github.com/ldmud/ldmud/pull/110).

The patch is in `src/comm.c`, in the `get_message()` function where new connections are accepted. The logic is the same as the MudOS patch: after `accept()` returns a new socket and before `new_player()` is called, peek at the first bytes and parse the PROXY header if present.

The feature is controlled by `#define SUPPORT_PROXY_PROTOCOL` in `config.h`, enabled at configure time with:

```sh
./configure --enable-use-proxy-protocol
```

The LDMud patch differs from the MudOS one in three ways:

1. **`\r\n` validation**: the header terminator is validated as `\r\n` per the PROXY protocol spec.

2. **IPv6 support**: LDMud can be compiled with `USE_IPV6`. The patch uses the `proto` field (`TCP4` vs `TCP6`) to select the right address parser, with IPv4-to-IPv6 mapping when needed and a warning when a TCP6 header arrives on a non-IPv6 build.

3. **Integration with configure**: the feature follows LDMud's standard `configure.ac` pattern with `--enable-use-proxy-protocol` (disabled by default) and appears in `--options` output as "PROXY protocol v1 supported".

### The patch

In `src/comm.c`, inside `get_message()`, find the `accept()` call for new connections:

```c
new_socket = accept(sos[i], (struct sockaddr *)&addr, &length);
if ((int)new_socket != -1)
    new_player( NULL, new_socket, &addr, (size_t)length
              , port_numbers[i].port);
```

Replace with:

```c
new_socket = accept(sos[i], (struct sockaddr *)&addr, &length);
if ((int)new_socket != -1) {
#ifdef SUPPORT_PROXY_PROTOCOL
    /* PROXY protocol v1 support.
     * If the first bytes on the connection are "PROXY ",
     * read the header line and replace the stored client
     * address with the real one.
     * Format: "PROXY TCP4 <src> <dst> <sport> <dport>\r\n"
     * If no PROXY header, proceed normally (backwards
     * compatible with direct connections).
     */
    {
        char proxy_buf[108];
        int n;

        n = recv(new_socket, proxy_buf,
                 sizeof(proxy_buf) - 1, MSG_PEEK);
        if (n >= 6
            && memcmp(proxy_buf, "PROXY ", 6) == 0)
        {
            char *end = (char *)memchr(
                proxy_buf, '\n', n);
            if (end && end > proxy_buf
                && *(end - 1) == '\r') {
                int hdr_len = (int)(end - proxy_buf) + 1;
                char proto[6], src_ip[46], dst_ip[46];
                int src_port, dst_port;

                /* consume from the socket */
                recv(new_socket, proxy_buf, hdr_len, 0);
                proxy_buf[hdr_len] = '\0';

                if (sscanf(proxy_buf,
                    "PROXY %5s %45s %45s %d %d",
                    proto, src_ip, dst_ip,
                    &src_port, &dst_port) == 5)
                {
                    if (strcmp(proto, "TCP4") == 0)
                    {
                        struct in_addr real4;
                        if (inet_aton(src_ip, &real4)) {
#ifdef USE_IPV6
                            /* map IPv4 to IPv6-mapped */
                            memset(&addr.sin6_addr, 0, 10);
                            memset((char*)&addr.sin6_addr+10,
                                   0xff, 2);
                            memcpy((char*)&addr.sin6_addr+12,
                                   &real4, 4);
                            addr.sin6_port =
                                htons((unsigned short)src_port);
#else
                            addr.sin_addr = real4;
                            addr.sin_port =
                                htons((unsigned short)src_port);
#endif
                        }
                    }
#ifdef USE_IPV6
                    else if (strcmp(proto, "TCP6") == 0)
                    {
                        struct in6_addr real6;
                        if (inet_pton(AF_INET6, src_ip,
                                      &real6) == 1) {
                            addr.sin6_addr = real6;
                            addr.sin6_port =
                                htons((unsigned short)src_port);
                        }
                    }
#else
                    else if (strcmp(proto, "TCP6") == 0)
                    {
                        debug_message(
                            "%s PROXY protocol: received "
                            "TCP6 address %s but driver "
                            "was compiled without IPv6 "
                            "support, ignoring.\n",
                            time_stamp(), src_ip);
                    }
#endif
                    /* else: unknown proto, drop
                     * (invalid header per spec) */
                }
            }
        }
    }
#endif /* SUPPORT_PROXY_PROTOCOL */
    new_player( NULL, new_socket, &addr, (size_t)length
              , port_numbers[i].port);
}
```

In `src/config.h.in`, add near the IPv6 define:

```c
/* Define this if you want PROXY protocol v1 support. When enabled, the
 * driver auto-detects PROXY protocol headers on new connections (as sent
 * by HAProxy, Traefik, etc.) and uses the real client IP instead of the
 * proxy's IP. Connections without a PROXY header work normally.
 */
@cdef_use_proxy_protocol@ SUPPORT_PROXY_PROTOCOL
```

In `src/main.c`, add the `--options` display line after IPv6:

```c
#ifdef SUPPORT_PROXY_PROTOCOL
                              , "PROXY protocol v1 supported\n"
#endif
```

And in `src/autoconf/configure.ac`, add the option and its processing (see the [pull request](https://github.com/ldmud/ldmud/pull/110) for the exact `configure.ac` changes).

All IP-related efuns (`query_ip_number()`, `query_ip_name()`, `interactive_info(II_IP_ADDRESS)`, `interactive_info(II_IP_NAME)`) transparently return the real client IP without any mudlib changes.

## DGD

We added PROXY protocol v1 support to our [DGD fork](https://github.com/maldorne/dgd) (`master` branch). DGD is unlike MudOS or LDMud in two ways that shaped the patch:

- **DGD is actively developed upstream** by Felix Croes, with regular merges. The fork should stay easy to rebase on `dworkin/dgd`, so we wanted the patch to live in dedicated files rather than scattered through existing source.
- **DGD splits networking** between `src/comm.cpp` (the driver/LPC-facing layer) and `src/host/connect.cpp` (the platform sockets layer). The `accept()` calls live in the host layer, in `XConnection::create()` (IPv4-only) and `XConnection::create6()` (IPv6 / dual-stack), each with its own copy of the post-accept setup.

So instead of inlining the parser like in MudOS and LDMud, we put it in two new files (`src/host/proxy.h` and `src/host/proxy.cpp`) that expose a single function:

```cpp
struct ProxyAddr {
    int family;                       /* AF_INET, AF_INET6, or 0 */
    union {
        struct in_addr  v4;
        struct in6_addr v6;
    };
    unsigned short port;
};

extern bool proxyParseV1(int fd, ProxyAddr *out);
```

The body of `proxyParseV1` is the same parser as MudOS and LDMud — `select(100ms)`, `MSG_PEEK`, strict CRLF validation, `sscanf` of the five fields, dispatch by `proto`. DGD natively supports IPv6, so both `TCP4` and `TCP6` are honoured. The whole translation unit is wrapped in `#ifdef SUPPORT_PROXY_PROTOCOL`; without that define the resulting `proxy.o` is empty and the driver behaves exactly like upstream.

The only edits to existing files are minimal: an `#include "proxy.h"` and one four-line `#ifdef` block in each of the two `XConnection::create*` functions, calling `proxyParseV1` and overwriting the local `In46Addr` if it returns true. That keeps the upstream merge surface tiny — if Dworkin refactors `connect.cpp`, conflict resolution is just relocating two short blocks.

The feature is controlled by `#define SUPPORT_PROXY_PROTOCOL`, set in `src/Makefile`'s `DEFINES` line alongside the other Maldorne-fork flags (`SLASHSLASH`, `PRESERVE_DEFAULTS_ON_RESTORE`). To build vanilla upstream-equivalent DGD, pass `make DEFINES=""`.

### The patch

`src/host/proxy.cpp` (the parser; abridged — full source [on GitHub](https://github.com/maldorne/dgd/blob/master/src/host/proxy.cpp)):

```cpp
#include "proxy.h"

#ifdef SUPPORT_PROXY_PROTOCOL

# include <stdio.h>
# include <string.h>
# include <unistd.h>
# include <sys/socket.h>
# include <sys/select.h>
# include <arpa/inet.h>

bool proxyParseV1(int fd, ProxyAddr *out)
{
    char buf[108];                    /* v1 max line length */
    fd_set readfds;
    struct timeval tv;
    int n;
    char *end;
    int hdr_len;
    char proto[6], src_ip[46], dst_ip[46];
    int src_port, dst_port;

    out->family = 0;
    out->port = 0;

    /* The accepted socket is non-blocking. Wait briefly to avoid a
     * race where MSG_PEEK returns EWOULDBLOCK before the proxy has
     * sent the header line.
     */
    FD_ZERO(&readfds);
    FD_SET(fd, &readfds);
    tv.tv_sec = 0;
    tv.tv_usec = 100000;              /* 100 ms */
    if (select(fd + 1, &readfds, NULL, NULL, &tv) <= 0) {
        return false;
    }

    n = recv(fd, buf, sizeof(buf) - 1, MSG_PEEK);
    if (n < 6 || memcmp(buf, "PROXY ", 6) != 0) {
        return false;
    }

    end = (char *) memchr(buf, '\n', n);
    /* spec mandates CRLF; reject bare LF */
    if (end == NULL || end == buf || *(end - 1) != '\r') {
        return false;
    }

    hdr_len = (int) (end - buf) + 1;
    (void) recv(fd, buf, hdr_len, 0);     /* consume from the socket */
    buf[hdr_len] = '\0';

    if (sscanf(buf, "PROXY %5s %45s %45s %d %d",
               proto, src_ip, dst_ip, &src_port, &dst_port) != 5) {
        return false;
    }

    if (strcmp(proto, "TCP4") == 0) {
        struct in_addr v4;
        if (inet_pton(AF_INET, src_ip, &v4) != 1) return false;
        out->family = AF_INET;
        out->v4 = v4;
        out->port = (unsigned short) src_port;
        return true;
    }
    if (strcmp(proto, "TCP6") == 0) {
        struct in6_addr v6;
        if (inet_pton(AF_INET6, src_ip, &v6) != 1) return false;
        out->family = AF_INET6;
        out->v6 = v6;
        out->port = (unsigned short) src_port;
        return true;
    }
    /* UNKNOWN or unrecognized proto: header consumed, addr unchanged */
    return false;
}

#endif /* SUPPORT_PROXY_PROTOCOL */
```

In `src/host/unix/connect.cpp`, add the include near the top:

```cpp
# include "comm.h"
# ifdef SUPPORT_PROXY_PROTOCOL
#  include "proxy.h"
# endif
```

In `XConnection::create6()` (IPv6 / dual-stack), after the existing block that sets `addr.addr`/`addr.addr6` and `addr.ipv6`, and before `conn->addr = IpAddr::create(&addr);`:

```cpp
# ifdef SUPPORT_PROXY_PROTOCOL
    {
        ProxyAddr p;
        if (proxyParseV1(fd, &p)) {
            if (p.family == AF_INET) {
                addr.addr = p.v4;
                addr.ipv6 = FALSE;
            } else {
                addr.addr6 = p.v6;
                addr.ipv6 = TRUE;
            }
        }
    }
# endif
```

In `XConnection::create()` (IPv4-only listener), after `addr.ipv6 = FALSE;`:

```cpp
# ifdef SUPPORT_PROXY_PROTOCOL
    {
        ProxyAddr p;
        if (proxyParseV1(fd, &p) && p.family == AF_INET) {
            addr.addr = p.v4;
        }
        /* TCP6 over an IPv4 listener cannot be represented here; ignore */
    }
# endif
```

Finally, in `src/host/Makefile`, add `proxy.o` to the `OBJ` list and a `proxy.o: proxy.h` dependency line. Note that `proxy.cpp` is **not** added to `SRC` — that variable lists files copied from `unix/` at build time and is wiped by `make clean`, which would delete our hand-written source. Once that's done, all DGD calls that resolve to the connection's stored IP (host name lookups, the `query_ip_number()` kfun, etc.) transparently return the real client IP.

## FluffOS

[FluffOS](https://github.com/fluffos/fluffos) is the main actively maintained fork of MudOS. It does **not** support PROXY protocol as of 2026. The same problem was [raised in 2019](https://github.com/fluffos/fluffos/issues/505) and the maintainer's approach was to add a native WebSocket server to the driver instead, avoiding the external proxy entirely.

*Work in progress. We are currently working on adding PROXY protocol support to FluffOS, following the same approach as our MudOS patch.*

## What about WebSocket proxies?

For browser-based MUD clients that connect through a WebSocket-to-telnet proxy (like our [mud-web-proxy](https://github.com/maldorne/mud-web-proxy)), the proxy knows the real client IP from the HTTP headers. It can inject a PROXY protocol v1 header when opening the telnet connection to the MUD, so the driver sees the real IP regardless of the connection path.

This means both connection paths are covered:

| Path | How the real IP is preserved |
|---|---|
| Telnet client → Traefik → MUD | Traefik sends PROXY protocol header |
| Web client → Traefik → WebSocket proxy → MUD | WebSocket proxy sends PROXY protocol header |

*Work in progress. We are currently working on adding PROXY protocol header injection to our [mud-web-proxy](https://github.com/maldorne/mud-web-proxy).*

## References

- [PROXY protocol v1/v2 specification (HAProxy)](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt)
- [Exploring the PROXY Protocol (blog post)](https://seriousben.com/posts/2020-02-exploring-the-proxy-protocol/)
- [Traefik TCP serversTransport documentation](https://doc.traefik.io/traefik/reference/routing-configuration/tcp/serverstransport/)
- [Traefik v3 migration: deprecation of proxyProtocol option](https://doc.traefik.io/traefik/migrate/v3/#deprecation-of-proxyprotocol-option)
- [Our MudOS fork with PROXY protocol support](https://github.com/maldorne/mudos/tree/v22.2-maldorne)
- [Our LDMud fork with PROXY protocol support](https://github.com/maldorne/ldmud/tree/3.6.8-maldorne)
- [Our DGD fork with PROXY protocol support](https://github.com/maldorne/dgd)
- [Pull request to official LDMud repository](https://github.com/ldmud/ldmud/pull/110)
- [HAProxy blog: Preserve Source IP Address Despite Reverse Proxies](https://www.haproxy.com/blog/preserve-source-ip-address-despite-reverse-proxies)
