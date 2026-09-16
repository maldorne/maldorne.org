---
title: 'Adventuring Parties'
date: 2026-09-17 21:30:00
author: neverbot
tags:
  - mud
  - hexagon
  - lpc
  - game-development
categories:
  - hexagon
---

[Hexagon](https://github.com/maldorne/hexagon) has adventuring parties now. You put one together on the spot, you share a channel nobody else hears, and you see on the map who is with you. When you are done with it, it is gone.

## What a party is

Whoever creates it leads it, and is the only one who can invite, throw somebody out, rename it or hand it over. Five people fit in one, and an invitation has to be taken up shortly after it is offered. If the leader leaves the world, whether they quit or their link drops, the next member takes over: a party does not evaporate halfway through a dungeon because the one who called it had to go.

Creating a party is the one thing a brand new character cannot do: it asks for five hours of play behind that character, counting the time it has been connected across all its sessions. Being invited to somebody else's party has no such condition, so a newcomer can be taken along from their first minute in the world. Both numbers, and the two above, are constants in a single header, so a game built on Hexagon can pick its own.

```
> party create Into the Caves
You create the party 'Into the Caves'.
> party invite dorian
You invite Dorian to your party.
> party list
Party 'Into the Caves':
  Ilmarin (leading)
  Dorian
```

The channel comes with it. `party channel <message>`, or the `adventurer` verb on its own, reaches everybody in it wherever they are standing.

```
> party channel we are at the second door
[Into the Caves] Ilmarin: we are at the second door
> adventurer anybody carrying a lockpick?
[Into the Caves] Ilmarin: anybody carrying a lockpick?
```

Everybody in the party reads that same line, the one who wrote it included, and it carries the party's name rather than the channel's real one. It also takes the options every channel in Hexagon takes: `!` for the last messages sent, `?` for a reminder of them.

## Looking at them from outside

Nothing about a party is written to disk: it lives as long as the mud is up and the people in it are around. So the only way to see what is going on is from inside the game, and staff have a `parties` command for it:

```
> parties
2 parties:
  1  Into the Caves                 #1#Into the Caves
       Ilmarin  (leader)
       Dorian
  4  Hunting the grey wolves        #4#Hunting the grey wolves
       Maddeus  (leader)
       Lambertra  (not connected)
```

One block per party: its id, the name its members read, the channel it talks on, and then everybody in it, the leader first, with anybody who is not connected at the moment marked as such.

The source code is in the [Hexagon repository](https://github.com/maldorne/hexagon).
