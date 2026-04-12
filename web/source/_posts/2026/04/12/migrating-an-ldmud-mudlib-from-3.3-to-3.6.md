---
title: 'Migrating an LDMud mudlib from 3.3 to 3.6'
date: 2026-04-12 22:00:00
author: neverbot
tags:
  - ldmud
  - docker
  - mud
  - infrastructure
  - lpc
categories:
  - ldmud
---

> Heads up: this is a technical post about porting an LDMud mudlib across 14 years of driver evolution. If you usually come here for game design or play notes, you can safely skip this one.

We run a small Spanish MUD called [Endor](https://maldorne.org/games/#Endor-Mud) that was built on [LDMud](https://github.com/ldmud/ldmud) 3.3.720, released in 2011. The mudlib had been running unchanged for years on a legacy host. When we decided to move it into our Docker cluster, we hit a wall: LDMud 3.3.720 has known 64-bit bugs that cause the driver to segfault on player login. The only way forward was to port the mudlib to the current stable version, LDMud 3.6.8.

This post documents every change we had to make.

<!-- more -->

## Why not just recompile 3.3.720?

We tried. LDMud 3.3.720 compiles cleanly on Debian 12 with `gcc 12` using `-O0` (no optimization). The driver starts, loads the mudlib, and reports "LDMud ready for users." But the moment a player tries to log in, the driver crashes with a segfault (exit code 139).

This is caused by [known 64-bit bugs in the 3.3.x branch](https://mantis.ldmud.eu/changelog_page.php) — issues with `remove_interactive`, memory allocation on x86_64, and `time_t` overflow that were fixed in later versions but never backported to 3.3.720.

We also tried:
- **Building with `-fno-strict-aliasing -fwrapv`** and other UB-prevention flags — still crashes.
- **Building with gcc-10** (Debian bullseye) — still crashes. It's a code bug, not a compiler issue.
- **Building as 32-bit** (`-m32`) — fails to compile because `sprintf.c` has 64-bit-only code paths.

None of these worked, so we decided to port the mudlib to 3.6.8.

## 1. Character encoding: ISO-8859-1 to UTF-8

LDMud 3.6.8 enforces UTF-8 encoding for all LPC source files at the compiler level. There is no flag to disable this.

Endor is a Spanish MUD. About 7,200 source files were encoded in ISO-8859-1, full of accented characters in room descriptions, NPC dialogue, and item names. We wrote a Python script that detects files with high bytes that aren't valid UTF-8 and converts them:

```python
data = open(path, 'rb').read()
if not any(b > 127 for b in data):
    continue  # pure ASCII, skip
try:
    data.decode('utf-8')
    continue  # already valid UTF-8
except:
    text = data.decode('iso-8859-1')
    open(path, 'w', encoding='utf-8').write(text)
```

Save files (`.o`), text files, and other data files were converted too.

## 2. Line endings: CRLF to LF

Many files had Windows-style `\r\n` line endings, visible as `<0x0d>` in git diffs. We converted them to Unix `\n` line endings across ~10,600 files with `perl -pi -e 's/\r\n/\n/g; s/\r/\n/g'` to keep the repository clean and avoid potential issues with the LPC compiler.

## 3. System headers from 3.6.8

The mudlib's `sys/` directory needed the header files from LDMud 3.6.8 (e.g. `configuration.h`, `object_info.h`, `interactive_info.h`, `driver_info.h`, `charset.h`). These define the constants used by the compatibility functions described below.

We copied all `sys/*.h` files from the [LDMud 3.6.8 source tree](https://github.com/ldmud/ldmud/tree/3.6.8/mudlib/sys) into the mudlib.

## 4. Deprecated efuns in the master object

The master object is loaded before the simul_efun object, so any deprecated efuns called by the master must be replaced directly with their new equivalents:

| Old efun | Replacement | Header needed |
|---|---|---|
| `seteuid(uid)` | `configure_object(this_object(), OC_EUID, uid)` | `configuration.h` |
| `query_once_interactive(ob)` | `efun::object_info(ob, OI_ONCE_INTERACTIVE)` | `object_info.h` |
| `query_idle(ob)` | `efun::interactive_info(ob, II_IDLE)` | `interactive_info.h` |
| `query_shadowing(ob)` | `efun::object_info(ob, OI_SHADOW_PREV)` | `object_info.h` |
| `shadow(ob, 0)` | `efun::object_info(ob, OI_SHADOW_NEXT)` | `object_info.h` |

## 5. Master function signature changes

LDMud 3.6.8 changed the expected signatures of several master applies:

- `log_error`: from `(string file, string err)` to `(string file, string err, int warn, int line)`
- `runtime_error`: from 4 arguments to 6 — added `mixed culprit` and `int caught`
- `make_path_absolute`: from `varargs (string path, string user)` to just `(string str)`

These had to be updated in both the header declarations and the implementations.

## 6. Compatibility simul_efun header

LDMud provides [official replacement simul_efuns](https://github.com/ldmud/ldmud/tree/3.6.8/mudlib/deprecated) for every deprecated efun. We created a single `secure/compat_368.h` file that `#include`s at the top of `simul_efun.c`, containing all the replacements the mudlib needs:

`seteuid`, `query_once_interactive`, `query_idle`, `query_shadowing`, `query_snoop`, `query_mud_port`, `query_ip_name`, `query_ip_number`, `query_load_average`, `set_is_wizard`, `debug_info`, `assoc`, `order_alist`, `insert_alist`, `shadow` (2-arg compat), `enable_commands`, `set_heart_beat`, `set_prompt`, `tail`, `hash`, and many more.

Functions that the mudlib's own `simul_efun.c` already implemented (like `cat`, `strlen`, `file_name`, `filter_array`, etc.) were skipped to avoid redeclaration errors.

One subtlety: `debug_info.h` and `driver_info.h` have overlapping `#define` constants (`TRACE_TYPE`, `TRACE_NAME`, etc.). We had to `#undef` the conflicting symbols before including `debug_info.h`.

## 7. set_this_object restriction

LDMud 3.6.8 does not allow calling simul_efuns while `set_this_object()` is in effect. The mudlib's `cat()` function used `set_this_object(previous_object())` and then called `strlen()`, which is now a simul_efun. The fix was to replace `strlen()` calls inside `cat()` with `efun::sizeof()` directly.

## 8. Multiple visibility modifiers

LDMud 3.6.8 disallows `private static` or `static private` — only one visibility modifier is allowed per declaration. Since `private` already implies `static` in LDMud 3.5+, a bulk replacement across ~89 files was sufficient:

```
private static → private
static private → private
```

## 9. Non-ASCII characters in identifiers

LDMud 3.6.8 does not allow non-ASCII characters in identifier names (macro names, variable names, function names). Our mudlib had a few `#define` names with `Ñ` and `ó`:

- `HAB_LEÑA` → `HAB_LENYA`
- `PUÑOFERREO` → `PUNYOFERREO`
- `NIV_LEÑA_AVENTUREROS` → `NIV_LENYA_AVENTUREROS`

These were renamed throughout the mudlib.

## 10. Type checking fixes

LDMud 3.6.8's type checker is significantly stricter than 3.3's. Several files needed individual fixes:

- Variables declared as `mapping` but used as `object` for `call_other` — changed to `mixed` with explicit `(object)` casts where needed.
- Variables declared as `int` but receiving `mixed` values from arrays — changed to `mixed`.
- Function signatures where a child class redeclared a function with different `varargs` or argument count — fixed to match the parent.
- Forward declarations in header files that didn't match the implementation signature.

Each file was fixed individually rather than disabling type checking globally.

## The result

Endor's mudlib loads and runs on LDMud 3.6.8. Players can log in, the database connection works (via a shared MariaDB Unix socket), and the driver is stable — no segfaults, no crashes.

The driver itself required **zero patches**. Every change was in the mudlib or in the compatibility simul_efun layer. LDMud's official `deprecated/` directory was invaluable — it provided drop-in replacements for every removed efun.

## What we learned

- **Don't try to keep the old driver alive.** We spent hours trying to make 3.3.720 work with modern compilers before accepting that the 64-bit bugs are unfixable without driver patches. Porting the mudlib to 3.6.8 was the right call.
- **LDMud's `deprecated/` directory is excellent.** Every removed efun has an official simul_efun replacement with the exact same behavior. Use them.
- **Convert encoding first.** The UTF-8 requirement is absolute — there's no flag to disable it. Do the bulk conversion before anything else.
