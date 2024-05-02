---
title: Shops fully operative and translated
date: 2021-10-19 21:11:14
author: neverbot
tags:
categories:
  - hexagon
language: en
---

At last, shops have been reviewed and they are operative. You can take a look to the ones included with de Fantasy Demo game:

- `/demo-fantasy/areas/erken/rooms/BS.c`
- `/demo-fantasy/areas/naduk/rooms/as.c`
- `/demo-fantasy/areas/elfereth/rooms/z21.c`

One in every town.


```
Shop.

      You are in a small shop in the town of Erken. Here you can buy or sell every
    kind of item with any value.

There is one obvious exit: -north-
Sign.
```

By default, a sign will be added:

```
> read sign
You read a text written in common:

 ┌───────────────────────────────────────────────────────────────────────────┐
 │                                                                           │
 │  Shop information:                                                        │
 │    - 'list' to see items on sale.                                         │
 │    - 'browse <item>' to see item information (price, condition, etc).     │
 │    - 'buy <item>' to buy something.                                       │
 │    - 'value <item>' to know how much will be paid for something you own.  │
 │    - 'sell <item>' to sell something you own.                             │
 │                                                                           │
 └───────────────────────────────────────────────────────────────────────────┘
```

And the commands can be used in any shop:

```
> list
We have fourteen items available:

   Just one Cape (1)
   A great selection of Daggers (9)
   Two Shirts (2)
   Just one Small wooden shield (1)
   Just one Trousers (1)

Max amount: 30000, current amount: 1136

> buy cape
You buy Cape for 4 bronze coins and 8 copper coins.
```
