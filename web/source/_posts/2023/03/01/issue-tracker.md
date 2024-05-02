---
title: Issue Tracker
date: 2023-03-01 00:11:14
author: neverbot
tags:
categories:
  - hexagon
language: en
---

Using the new packages functionality, I've added a new package to the Hexagon mudlib: the issue tracker.

![issue-tracker](./issue-tracker/issue-tracker.png)

The packages adds its own command `issues`, where you can list, close, remove or open issues.

We can create new issues automatically, i.e. when a shop cannot load an item:

```
    // create new issue, same message as npcs equipment
    if (package("issues"))
      package("issues")->add_issue("Cannot clone " + file, this_object());
```