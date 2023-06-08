---
title: New web client
date: 2020-04-05 18:54:56
author: neverbot
tags:
categories:
  - web
language: en
---

We've recovered the web client which was available in the old _ciudadcapital.net_ web page, and it's now available in the [**play**](/play) page, which you can find in the web header.

_Some techno-babble:_

It was difficult to make it work, because we had to update two old projects which did not work with secure web pages (`https://`). You can find both updated projects in [github.com](https://github.com/maldorne/), just in case some of you would want to take a look, use them or suggest some improvement or change:

* [`mud-web-client`](https://github.com/maldorne/mud-web-client) is the web client you can see in our web. It connects through secure web sockets (`wss://`) to a proxy between the client and the telnet mud.
* [`mud-web-proxy`](https://github.com/maldorne/mud-web-proxy) is the proxy running in the mud server, that provides the _translation_ between `wss` and `telnet`.

Comments are welcome, both in the github `issues` or through the [House of Maldorne Twitter](https://twitter.com/houseofmaldorne).
