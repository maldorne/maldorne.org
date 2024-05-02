---
title: Demo game now fully functional
date: 2023-03-19 00:11:14
author: neverbot
tags:
categories:
  - hexagon
language: en
---

At last, the `demo-fantasy` game included with the Hexagon mudlib is fully functional. You can start the mudlib, choose a game, create a character, and test it. It has a full map with three towns, each of them with pub and shop, multiple npcs, several items, etc.

```
                                                 An : Naduk      
                  3-4-R                          Bn : Erken      
                  |                              TD : Tower
                  2                              G  : Guild   
                  |                              R  : Raiseroom
               TD-1-G                            41 : Labyrinth       
                  |                              *S : Shop
                  5            38                *P : Pub
                / |           /                  1  : Start
                7-6      35-36-37         A6 AS
                   \     |/ |\           /|\ |
                    8-9-10-11-12-13-A1-A2-A3-A4-A7
                   /   \ |/ |            \|/ | 
                 21     39 40-27-41       A5 AP
                /      / |  |  |
              22     14-15 16-26-41
               |    /    | /   |
              24   17    18   28-41
               |    |   /    /
              23   19-20-30-29
               |       |  |
              25      31-32  34
               |           \ |
              B1            33
               |\
              B2 B3
             /| \|
           B6-B4-B5
           |  |  |
           BS B7 BP
              |
          B10-B8-B9
```

It is based in a very old newbie area made for the **Reinos de Leyenda** mud, circa maybe 1997. The code is new (as we use a different driver, from MudOS to DGD), but the map and the names have been kept, as an homage.

You can take a look to the game, it is included with the mudlib as an example of how to create your own game. Take a look at it in `/mudlib/games/demo-fantasy` in the [Hexagon repository](https://github.com/maldorne/hexagon).
