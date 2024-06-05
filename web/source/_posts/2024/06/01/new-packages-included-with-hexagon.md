---
title: New packages included with Hexagon
date: 2024-06-01 21:36:26
author: neverbot
tags: 
  - hexagon
  - packages
---

The `Hexagon` mudlib/framework has been updated with new packages, which include the following:

- `crypt`: code and command to encrypt and decrypt files, based on Dave Ljung's (Jubal) [code](http://davesource.com/Projects/LPMuds/bin/x.c), ported to be used with DGD and Hexagon.
- `json`: code to encode and decode LPC values as `json` strings. Modified from an [LPC snippet](https://github.com/atari2600tim/LPCsnippets/blob/master/json.c) created for MudOS, changed to be executed with DGD.
- `uuid`: easy way to create `uuid` strings ([RFC4122](https://tools.ietf.org/html/rfc4122)), also addapted from an [LPC snippet](https://github.com/atari2600tim/LPCsnippets/blob/master/uuid.c).

Take a look inside the `/mudlib/packages` directory [in the repository](https://github.com/maldorne/hexagon/) to see the code, documentation and license for each package. 
