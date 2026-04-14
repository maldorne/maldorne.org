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

We added PROXY protocol v1 support to our [MudOS fork](https://github.com/maldorne/mudos) (branch `v22.2-maldorne`). The patch is in `driver/comm.c`, inside the `new_user_handler()` function, right after the `accept()` call stores the peer address.

The logic:

1. `MSG_PEEK` the first bytes of the new connection.
2. If they start with `"PROXY "`, read the full header line (up to `\r\n`).
3. Parse the source IP and port from the header.
4. Overwrite the stored client address in the `interactive_t` struct.
5. If the connection does not start with `"PROXY "`, do nothing — backwards compatible with direct connections.

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

    n = recv(new_socket_fd, proxy_buf, sizeof(proxy_buf) - 1, MSG_PEEK);
    if (n >= 6 && memcmp(proxy_buf, "PROXY ", 6) == 0) {
        char *end = (char *)memchr(proxy_buf, '\n', n);
        if (end) {
            int hdr_len = (end - proxy_buf) + 1;
            char proto[6], src_ip[46], dst_ip[46];
            int src_port, dst_port;

            /* consume the header from the socket */
            recv(new_socket_fd, proxy_buf, hdr_len, 0);
            proxy_buf[hdr_len] = '\0';

            if (sscanf(proxy_buf, "PROXY %5s %45s %45s %d %d",
                       proto, src_ip, dst_ip, &src_port, &dst_port) == 5) {
                struct in_addr real_addr;
                if (inet_aton(src_ip, &real_addr)) {
                    all_users[i]->addr.sin_addr = real_addr;
                    all_users[i]->addr.sin_port = htons((unsigned short)src_port);
                    addr.sin_addr = real_addr;
                }
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

*Section to be written. The patch follows the same pattern: read the first bytes after `accept()` in `comm.cc`, parse the PROXY header if present, and override the stored client address.*

## DGD

*Section to be written.*

## FluffOS

[FluffOS](https://github.com/fluffos/fluffos) is the main actively maintained fork of MudOS. It does **not** support PROXY protocol as of 2026. The same problem was [raised in 2019](https://github.com/fluffos/fluffos/issues/505) and the maintainer's approach was to add a native WebSocket server to the driver instead, avoiding the external proxy entirely. For setups that still need a reverse proxy, a similar patch to the one described above for MudOS should apply to FluffOS's `src/net/` networking code with minor adaptations.

## What about WebSocket proxies?

For browser-based MUD clients that connect through a WebSocket-to-telnet proxy (like our [mud-web-proxy](https://github.com/maldorne/mud-web-proxy)), the proxy knows the real client IP from the HTTP headers. It can inject a PROXY protocol v1 header when opening the telnet connection to the MUD, so the driver sees the real IP regardless of the connection path.

This means both connection paths are covered:

| Path | How the real IP is preserved |
|---|---|
| Telnet client → Traefik → MUD | Traefik sends PROXY protocol header |
| Web client → Traefik → WebSocket proxy → MUD | WebSocket proxy sends PROXY protocol header |

## References

- [PROXY protocol v1/v2 specification (HAProxy)](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt)
- [Exploring the PROXY Protocol (blog post)](https://seriousben.com/posts/2020-02-exploring-the-proxy-protocol/)
- [Traefik TCP serversTransport documentation](https://doc.traefik.io/traefik/reference/routing-configuration/tcp/serverstransport/)
- [Traefik v3 migration: deprecation of proxyProtocol option](https://doc.traefik.io/traefik/migrate/v3/#deprecation-of-proxyprotocol-option)
- [Our MudOS fork with PROXY protocol support](https://github.com/maldorne/mudos/tree/v22.2-maldorne)
- [HAProxy blog: Preserve Source IP Address Despite Reverse Proxies](https://www.haproxy.com/blog/preserve-source-ip-address-despite-reverse-proxies)
