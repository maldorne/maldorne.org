---
title: Spring/summer 2023 updates
date: 2023-02-01 00:11:14
author: neverbot
tags:
categories:
  - updates
  - hexagon
language: en
---

Changes and updates to the mudlib in its **v1.21.09 Beregost** version. This post will be updated during the spring and summer:

### Player updates

  * Weapons reviewed, and lots of weapons added to the Fantasy Demo game.
  * `hold`/`unhold` working with weapons.
  * Armours reviewed, and lots of armours added to the Fantasy Demo game.
  * `wear`/`unwear` working with clothes and armours.
  * Shields reviewed, and shields added to the Fantasy Demo game.
  * Weapon combat fully functional.
  * Basic materials for items (weapons, clothes, armours, etc).
  * Passed out when equipping reviewed (doesn't happen recently logged in). `equip` reviewed.
  * Multiple commands reviewed:
    * `user/games`
    * `user/characters`
    * `player/help`
    * `player/look`
    * `player/prompt`
    * `player/commands`
    * `player/glance`
    * `player/kill`
    * `player/prompt`
    * `player/retire`
    * `player/configuration`
    * `player/score`
    * `player/sheet`
    * `player/verbose`
    * `player/inform`
    * `player/bury`
    * `player/cost`
    * `player/stop` (for both `stop fights` and `stop following`)
    * `player/encumbrance`
    * `player/bravery`
    * `player/condition`
    * `player/money`
    * `player/combats`
    * `player/past`
    * `player/inventory`
    * `player/whomai`
    * `player/away`
    * `player/consider`
    * `player/travel`
    * `player/equipment`
    * `player/pov`
    * `player/time`
    * `player/grope`
    * `player/map`
  * Health messages (health points, death, etc) fully translated.
  * Handle actions (`take`, `drop`, `give`) reviewed and fully translated en/es.
  * Hearthstone item reviewed.

### Developer updates

  * Multiple commands reviewed (see issue [#15](https://github.com/maldorne/hexagon/issues/15))
    * `coder/goto`
    * `coder/stats`
    * `coder/cat`
    * `coder/clone`
    * `coder/exits`
    * `coder/exec`
    * `coder/grep`
    * `coder/head`
    * `coder/more`
    * `coder/restore`
    * `coder/rm`
    * `coder/sar`
    * `coder/tail`
    * `coder/uptime`
    * `coder/armours`
    * `coder/discard`
    * `coder/actions`
    * `coder/backup`
    * `coder/cp`
    * `coder/cplines`
    * `coder/du`
    * `coder/ioulist`
    * `coder/load`
    * `coder/malloc`
    * `coder/mkdir`
    * `coder/mv`
    * `coder/rmdir`
    * `coder/ls`
    * `coder/nls`
    * `coder/visible`
    * `coder/invisible`
    * `coder/multi`
    * `coder/resistances`
  * Command handler translation and meta commands (use command `rehash` to reload all of them).
  * Multilanguage commands: now commands are not executed depending on their file names, but a list of alias specified in code.
  * Some tests done with binary connections.
  * Start working with packages: pieces of code included in the `/packages` directory, each of them with its own code, license, authors, etc.
    * Each package can add their own commands automatically.
  * Issue tracker working (new package).
  * Start working with a test suite (new package).
