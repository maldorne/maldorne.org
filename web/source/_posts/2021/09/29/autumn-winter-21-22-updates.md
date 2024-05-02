---
title: Autumn/winter 21/22 updates
date: 2021-09-29 00:11:14
author: neverbot
tags:
categories:
  - updates
  - hexagon
language: en
---

Changes and updates to the mudlib in its **v21.09 Beregost** version. This post will be updated during the autumn and winter:

### Player updates

  * `kill` command translated.
  * Help about multiple commands reviewed, use `help <cmd>` to test it.
    * `coder/exec`
    * `coder/exits`
    * `coder/grep`
    * `coder/home`
    * `coder/ls`
    * `coder/peace`
    * `coder/sar`
    * `login/finger`
    * `login/who`
    * `player/kill`
    * `player/look`
    * `player/prompt`
  * {% post_link some-ascii-ansi-improvements-using-box-drawing-characters %}.
  * Unarmed combat messages heavily improved.
  * Notifications system for players: use `notifications` command.
  * `alias` and `nicknames` reviewed.

### Developer updates

  * {% post_link tinkering-with-the-vt100-terminal %}.
  * Solved bug with `find_match` (see [#10](https://github.com/maldorne/hexagon/issues/10)).
  * Major `auto_load` revision: savefiles, vaults, update, ious.
  * Old `login` cmds are now `user` cmds.