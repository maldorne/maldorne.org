---
title: 'Modernizing the MudOS Driver: From Sarge to Bookworm'
date: 2026-04-09 22:00:00
author: neverbot
tags:
  - mudos
  - docker
  - debian
  - gcc
  - mud
  - infrastructure
categories:
  - mudos
---

![MudOS](./modernizing-the-mudos-driver/mudos_logo.webp)

> Heads up: this is a technical post about programming and, frankly, software archaeology — compilers, linkers, decades-old C, that sort of thing. If you usually come here for game design, mud lore or play notes, you can safely skip this one. We will be back to the regular topics in the next post.

Some of the muds we run at maldorne are still based on [MudOS](https://github.com/maldorne/mudos), a driver whose codebase was last seriously touched in the early 2000s. Until this week, the way we built that driver was to compile it inside a [Debian Sarge](https://wiki.debian.org/DebianSarge) (3.1, released in 2005) container, with `gcc 3.3.5`, on a 32-bit i386 base image. It worked, the binary was rock solid, but the surrounding userland was 20 years old: ancient `glibc`, no security patches, no current toolchain.

So we sat down to see if we could compile MudOS on a current Linux. Spoiler: we could. This post is a tour of what it took.

## The starting point

Each version branch in the [`maldorne/mudos`](https://github.com/maldorne/mudos) repository has its own `Dockerfile`. They all looked roughly like this:

```dockerfile
FROM debian/eol:sarge-slim

COPY container/sources.list /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update
RUN apt-get update && apt-get -f dist-upgrade
RUN apt-get install -f -y --force-yes git gcc bison make libc6-dev

RUN groupadd -g 4200 mud
RUN useradd -u 4201 -g 4200 -ms /bin/bash mud
USER mud

WORKDIR /opt/mud
COPY --chown=mud:mud driver /opt/mud/driver/
WORKDIR /opt/mud/driver
RUN ./build.MudOS && make && make install
```

`debian/eol:sarge-slim` is i386 only, so any image FROM it inherits the same architecture. The `build.MudOS` shell script auto-detects the compiler and CFLAGS, picks `gcc`, and builds the driver binary plus an `addr_server`. With Sarge it Just Works because that is the world the code was written in. With anything modern, things start breaking.

## Attempt 1: just swap the base image

The first try was the obvious one:

```dockerfile
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
      build-essential bison make gcc libc6-dev \
      git openssh-client ca-certificates

# ... same as before
```

The first errors were noise: `gcc 12` is much stricter than `gcc 3.3` and complains about a lot of K&R style C that was perfectly normal in the 90s — implicit function declarations, missing return types, mismatched integer-to-pointer conversions, and tentative definitions. Most of those are warnings by default in `gcc 12`, but a few are errors, and they all come from a single common source: code that does not have prototypes for functions that return pointers.

The fix for that part was a set of compatibility flags applied to `CFLAGS`:

```
-fgnu89-inline
-fcommon
-Wno-implicit-function-declaration
-Wno-implicit-int
-Wno-return-type
-Wno-int-conversion
-Wno-error=implicit-function-declaration
-Wno-error=implicit-int
-Wno-error=int-conversion
```

What each one does:

- **`-fgnu89-inline`** restores the pre-C99 GNU semantics of the `inline` keyword. The MudOS source uses an `INLINE` macro that expands to `inline`, and it relies on the old GNU rule that a plain `inline` function is *also* emitted as an external symbol. C99 changed that: a plain `inline` is just a hint, and the symbol only exists if there is a separate non-inline definition somewhere. Without this flag, functions like `whashstr()` in `hash.c` are inlined where used and then disappear from the object file, and the final link fails with `undefined reference to whashstr`.
- **`-fcommon`** restores the pre-`gcc 10` behavior for tentative definitions (the implicit `extern int foo;` thing). New `gcc` defaults to `-fno-common` and considers duplicate tentative definitions an error. The MudOS code has plenty of those.
- **The `-Wno-*` and `-Wno-error=*` family** simply tells `gcc` not to upgrade legacy K&R warnings into errors. It does not silence the warnings themselves; we still see them during the build, but they no longer abort the process.

`build.MudOS` reassigns `CFLAGS` internally and ignores any `ENV CFLAGS` we set, so we patch the script with a `sed` step in the `Dockerfile` to inject the flags right before its own detection runs.

After that first round, the driver compiled, the binary built, and the container started. We even saw `Accepting connections on port 5000`.

## Attempt 2: the segfault

Then we tried to log in. The driver crashed with a segfault inside `/secure/master::connect()`, just before that, there was a suspicious warning during the preload phase:

```
Illegal object to load: return value of master::creator_file() was not a string.
```

That warning was the smoking gun. `creator_file()` is supposed to return a string. The C side of the driver was reading the LPC return value and seeing… something else. A truncated pointer.

When you compile K&R C code without prototypes on a 64-bit machine, every function whose declaration the compiler has not seen is assumed to return `int`. On 32-bit Linux (Sarge), that is harmless because `int` and `void *` are both 32 bits wide. On 64-bit Linux (modern Bookworm amd64), `int` is still 32 bits, but `void *` is 64 bits, so any function that actually returns a pointer gets its return value silently truncated to 32 bits and the high 32 bits are lost. The result is a corrupt pointer that the next caller dereferences and dies.

This is exactly the kind of bug the warnings we silenced (`-Wimplicit-function-declaration`, `-Wint-conversion`) were trying to tell us about. Patching every offending file in MudOS would have taken hours and would have meant carrying a divergent fork forever. The much cheaper fix is to not have a 64-bit pointer in the first place.

## Attempt 3: a 32-bit binary on a 64-bit base

Debian 12 has perfectly good support for compiling and running 32-bit binaries on a 64-bit host via `gcc-multilib` and the i386 multiarch packages. That gives us the best of both worlds:

- The container runs on a modern 64-bit Linux with current `glibc`, `openssl`, `git`, `openssh`, security patches, the works.
- The MudOS driver itself is built as an i386 ELF binary, so `int` and `void *` are again the same width and the K&R code behaves exactly like it did on Sarge.

The relevant changes in the `Dockerfile`:

```dockerfile
FROM --platform=linux/amd64 debian:bookworm-slim

RUN dpkg --add-architecture i386 \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential bison make gcc gcc-multilib libc6-dev libc6-dev-i386 \
      libcrypt-dev:i386 \
      git openssh-client ca-certificates
```

And `-m32` is added to the `CFLAGS` patch mentioned above. The `--platform=linux/amd64` is there so the same `Dockerfile` builds the same image regardless of where you build it: an Apple Silicon laptop, a Windows ARM machine, an x86 Linux server, or GitHub Actions. Inside that `amd64` image, the i386 multiarch toolchain produces the 32-bit driver.

With these changes, `v21.7b21_fr` compiled cleanly and the resulting `driver` binary was a tiny ~720 KB ELF32 executable that worked end-to-end against a real mudlib. We thought we were done.

## Attempt 4: the missing libraries

Then we went to port the same recipe forward to `v21.7` and the link step blew up with two different errors:

```
/usr/bin/ld: cannot find -ly: No such file or directory
/usr/bin/ld: skipping incompatible /usr/lib/x86_64-linux-gnu/libnsl.so when searching for -lnsl
/usr/bin/ld: cannot find -lnsl: No such file or directory
```

The driver in MudOS calls a script at configure time called `edit_source -configure` that, among many other things, probes the system for optional libraries and writes whichever it finds to a file called `system_libs`. That file is then passed verbatim to the final link of the `driver` binary. `edit_source` probes for `-ly` (the old yacc runtime library that historically provided default implementations of `yyerror()` and `main()`), `-lnsl` (the old network services library), `-lresolv`, `-lbsd`, and several others. On Sarge those libraries existed in the i386 system libdir, the probe succeeded, they went into `system_libs`, and the link worked. On Debian 12:

- Modern `bison` does not need a yacc runtime library at all, so Debian stopped shipping `liby.a` years ago, in any architecture.
- `libnsl` still exists in amd64 (it is available as an independent package because glibc no longer re-exports it), but on i386 via multiarch it is not readily available. And `libnsl`'s functions (`gethostbyname()`, the rest of the name services machinery) have been folded into glibc proper on Linux for a long time, so nothing in MudOS actually needs them at link time.

The probe in `edit_source` happens in a build mode that does not pass `-m32`, so `-lnsl` looked available (the amd64 `.so` was found), got added to `system_libs`, and then failed at the real link step which is `-m32`. And `-ly` just got added because the probe is not pedantic enough.

The fix is a one-liner, but it needs to happen in between two `make` invocations. Instead of running `make` end-to-end in the `Dockerfile`, we run `make configure.h` first (which is the target that invokes `edit_source -configure` and therefore generates `system_libs`), then patch the file with `sed`, and only then run the full `make`:

```dockerfile
RUN ./build.MudOS
RUN make configure.h
RUN sed -i -E 's/(^| )-ly($| )/\1\2/g; s/(^| )-lnsl($| )/\1\2/g' system_libs
RUN make
RUN make install
```

The `sed` is written with word boundaries so it only strips the exact `-ly` and `-lnsl` tokens and leaves unrelated libraries (`-lresolv`, `-lbsd`, `-lcrypt`, `-lm`, and so on) untouched. After this, every branch links cleanly.

We applied the same `sed` step defensively to every branch, including the ones where the build had worked without it. Three of them (`v21.7b21_fr`, `v22.2b13`, `v22.2b14`) happen to trigger the probe in a way that never adds `-ly` or `-lnsl` to `system_libs` — so the `sed` is a no-op for them — but keeping the `Dockerfile` identical across branches is a lot more valuable than the two extra lines it costs. Any future fix we discover on one branch can now be copy-pasted into the others without thinking.

## The result

Every supported MudOS branch in [`maldorne/mudos`](https://github.com/maldorne/mudos) — `v21.7`, `v21.7b21_fr`, `v22.2b13` and `v22.2b14` — has been migrated to the new build, all sharing the **exact same `Dockerfile`** (except for the version string in the header comment):

| Before | After |
|---|---|
| Debian Sarge 3.1 (2005), i386 | Debian 12 Bookworm, amd64 base, i386 binary |
| `gcc 3.3.5` | `gcc 12` with K&R compat flags |
| Pre-historic `glibc`, no security updates | Modern `glibc 2.36`, regular Debian security updates |
| Tied to a 32-bit-only base image | Builds on any host that runs Docker, regardless of architecture |

The published images on the [GitHub Container Registry](https://github.com/maldorne/mudos/pkgs/container/mudos) keep the same tags (`ghcr.io/maldorne/mudos:<version>`), so anything that pulled them before keeps working without changes.

## Why bother

It would have been easier to leave Sarge alone. The driver binary it produces is bit-for-bit reproducible, and it has worked for years. But the world around it kept moving:

- We could not run the driver image anywhere that did not support 32-bit emulation (which is most of modern arm64 hardware).
- We could not pull or rebuild the surrounding userland for security fixes — Sarge has been EOL since 2010.
- And, most prosaically, every time we touched the build we had to remember that we were inside a 20-year-old time capsule.

Now the MudOS images are just normal Debian 12 containers that happen to ship a 32-bit binary inside. They get rebuilt on push, they get security updates, and they can be inspected with modern tools. The driver itself is unchanged — same source, same behavior, same protocol — it just lives in a friendlier house.

Source code, `Dockerfile`s and the full set of compat flags are in the [`maldorne/mudos`](https://github.com/maldorne/mudos) repository, one branch per supported version.
