---
title: Notifications system
date: 2021-09-29 21:11:14
author: neverbot
tags:
categories:
  - hexagon
language: en
---

The old `tell_player()` function has been removed, and a better notifications system is in place. Now, every time we need to notify a player of something really important, we can use:

```
 user->add_notification(type, message);
```

and it will be shown after the pending actions and current `heart_beat` has finished (this is useful to avoid situations like entering a new room, something happening and the message would be shown before seeing what is inside said room).

The player will be able to show their last notifications:

```
> notifications

 ╒════════════════╡ Past notifications ╞═════════════════╕
 │                                                       │
 │   19:18:55 - You are connected! Welcome to Hexagon.   │
 │                                                       │
 ╘═╕/════════════════════════════════════════════════════╛
```
