---
title: Tinkering with the vt100 terminal
date: 2021-11-05 11:19:11
author: neverbot
tags:
categories:
language:
---

I've been playing with the vt100 terminal specification (read [some history](https://en.wikipedia.org/wiki/VT100) on the wikipedia, some _very_ [technical specification](https://vt100.net/docs/vt100-ug/chapter3.html)), and although is not very useful yet, some results can be shown:

{% asset_img "vt100.png" "New sidebar" %}

Has to be _really, really_ improved, as at the moment everything is recalculated with every message sent to the user, but now we can draw characters (and boxes with content) at any position of the screen. Obviously, this will be optional and configurable per player, as not every mud client is compatible with the vt100 spec.

The worldmap is fake for now, but I'm working on it :)
