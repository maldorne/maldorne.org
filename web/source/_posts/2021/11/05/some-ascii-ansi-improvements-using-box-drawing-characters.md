---
title: Some ascii/ansi improvements using box drawing characters
date: 2021-11-05 10:49:02
author: neverbot
tags:
categories:
  - hexagon
language:
---

Some improvements have been done in the way some ascii/ansi characters are handled, doing extensive use of the new `chr()` efun, so problems wouldn't appear with the encodings of the files in the mudlib. Still a work in progress with some things to polish, but seems to be working.

![New frames](./some-ascii-ansi-improvements-using-box-drawing-characters/frames.png)

Take a look to the frames handler that renders boxes with text inside if you need more info, in `/lib/handlers/frames.c`.
