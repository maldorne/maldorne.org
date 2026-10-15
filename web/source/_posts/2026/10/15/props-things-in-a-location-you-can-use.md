---
title: 'Props: Things in a Location You Can Use'
date: 2026-10-15 10:00:00
author: neverbot
tags:
  - mud
  - hexagon
  - lpc
  - game-development
  - architecture
categories:
  - hexagon
---

`add_item` is common in LPC mudlibs. A room calls it with a name and a description, and when a player types `look chair`, the chair is there. That is all it does. The chair cannot be sat on, it cannot be knocked over, and it says the same thing whether the room is empty or full.

[Locations](/2025/01/23/from-rooms-to-locations-an-ecs-approach/), the component-based replacement for rooms in [Hexagon](https://github.com/maldorne/hexagon), needed something better for the things that fill them, so I built props instead of carrying `add_item` over. A prop belongs to the location, like an item added with `add_item` did, but it has a type, its own state, and actions that change that state.

<!-- more -->

## What a prop is

A location with props has the props component, and the component keeps a list of instances. Each instance has a type (`chair`, `throne`, `forge`, `bed`, `statue`...), an id, the overrides the builder set on it, and its current state. The state is saved with the location.

The types live in a catalogue, one table with thirty of them right now: chairs, thrones, tables, beds, bunks, a bar counter, fireplaces, fountains, wells, altars, statues, runes, paintings, tapestries, troughs, mangers, and the anvil, bellows, forge and tools of a smithy, among others. An entry is plain data: the words the type answers to, its descriptions, the materials it can be made of, its default state, and a set of actions. Each action says which verbs trigger it, which state it needs, what blocks it, what it changes, and what the player and the rest of the location read. A chair's `sit` needs nobody sitting on it, is blocked if the chair has been tipped over, and sets the occupant to whoever sat down. `tip` throws that occupant off.

A game built on Hexagon can add its own types or replace the shared ones with a props table of its own, merged over the base catalogue.

This is the king's throne in Takome, in one of the games built on Hexagon, [Reinos de Leyenda: Aeternum](/games/#Hexagon):

```
> look throne
Wooden throne.

      A grand, solemn wooden throne with a tall back, made for a sovereign to
    preside from.

You can: sit.
> sit on throne
You sit on the throne.
> look throne
Wooden throne.

      A grand, solemn wooden throne with a tall back, made for a sovereign to
    preside from. Aldric is sitting on it.

You can: stand.
> stand
You stand up.
```

The description picked up a sentence from the throne's state, and the "You can" line changed with it: it lists only the actions that would do something right now, so once somebody is sitting on the throne the only thing left to offer is standing up. The occupant is cleared when they leave the location, so nobody stays sitting on a throne they walked away from.

## Why props are not items

Hexagon already had a way to put a usable object in a location: fixtures. A fixture is an item that cannot be picked up, and it is the obvious tool if you only ask how to make a chair you can sit on. I chose not to use it for every chair, bed and tapestry because of what an item costs.

An ordinary item is a clone of the item base class, which inherits about seventeen programs (the base object, the basic modules, light, movement, weight, value, alignment, condition, readable descriptions) and carries around thirty global variables of its own. It can move between inventories, it gets `init()` when something meets it, and it keeps its own light and weight. A fixture is all of that with a weight of 0. The location saves how many of each fixture it should have and clones the missing ones every time it loads, so a fixture keeps no state from one load to the next. Each one adds its verbs in its own `init()` for every living thing that walks in, and each one needs its own `.c` file.

A prop is a small mapping with four fields (type, id, overrides, state) inside the location's props component. All the props of a location live in that one component object: a location with eight props has one component, not eight objects, and a location with no props has no component at all. Each type is written once in the shared catalogue and translated once, for every game. The state of every instance is saved inline in the location's own save file, and nothing is cloned when the location is restored.

The behaviour lives in one place too. One function in the component handles every prop verb in the location, and most actions are the declarative specs described above, with no code per prop. Matching (`chair 3`), counting and grouping ("five bunks") are computed from the data. The light of all the props is one sum set on the component. Leaving the location is one event that clears every seat and bed the player was using. No prop has a `heart_beat` or a `call_out` of its own. That matters in DGD, where the driver is configured with a fixed maximum number of objects and of call_outs.

For example, in [Reinos de Leyenda: Aeternum](/games/#Hexagon) at the time of writing, with only a very small part of the game open and props tried in a few zones to gather some figures, there are 259 props across 132 locations, held by 132 component objects instead of 259 item clones. A saved instance takes about 186 bytes on average. The most common types are tapestries (47), chairs (28), bunks (26), tables (20) and scenery (19).

A fixture is still the right tool when one particular thing needs its own LPC code: a skill check, a timed effect on the player, an object that reveals a sealed exit or moves someone through it. Prop behaviour belongs to the type and is the same for every instance. Things that hold other things, a chest or a barrel, stay items, since a prop has no inventory. So does anything a player must be able to pick up and take away.

## State that other things drive

A prop's state can also be changed by other parts of the mudlib. The blacksmith component, which turns a location into a smithy, gives it a forge, an anvil and bellows if it does not have them yet, and keeps the forge lit while somebody who works there is in the location. This is the smithy at Erken with the blacksmith at work:

```
You see a metal anvil, a leather bellows, a stone forge (lit), a wooden shelf
and a set of tools.
Citizen and Blacksmith are here.
> look forge
[...]
You can: warm.
```

The forge's only action is to warm yourself at it, and that needs it lit. When the smith leaves, the forge goes cold, its description says nobody is working the anvil today, and the "You can" line disappears. A type can also give light while some state is set. A burning forge or fireplace adds 30 to the location's light, and the location's light follows every change.

## Inscriptions

Any prop can carry an `inscription` override, and then `read` shows it the way written text is shown everywhere else in the game: in a frame, in the instance's language if it has one, and garbled for a reader who does not know that language. The statue of Valdor in a corridor of the Warrior Mages' house:

```
> look statue
[...]
      A stone statue of Valdor, the first patron of the Warrior Mages. He holds
    an open book in one hand and a sword in the other.

You can: pray, read.
> read statue
You step up to the pedestal of the statue and read what is carved on it.
You read:
 ┌──────────────────────────────────────────────┐
 │                                              │
 │  Valdor, first patron of the Warrior Mages.  │
 │                                              │
 └──────────────────────────────────────────────┘
```

A prop with nothing written on it does not offer `read`, and if somebody tries anyway, it answers like any other object with nothing to read.

## One prop per object

Five bunks in a barracks are five `bunk` instances, never one instance whose description says "five bunks". The location counts them for the player in its list of things, and each one can be looked at and used on its own: `look bunk 3` picks the third. Instances with the same short are grouped under it, and a group can have a plural of its own.

`scenery` is the general case: a prop that needs nothing from the catalogue. It has no actions and no words of its own, so it cannot be used in any way; it is there to be seen. A builder places it to put something in a location with a description of its own, a heap of rubble or some broken tiles, and each instance says what it is through its overrides: its short, the words it answers to and its description. It is decoration, but real decoration: it shows in the location's list of things, it can be looked at, and it is counted and grouped like any other prop.

## How a builder adds them

Props are added from inside the game, standing in the location, with the `props` command. The props component is attached with the first one:

```
props types
props add throne
props set throne_1 overrides.material stone
props add milestone
props set milestone_1 overrides.inscription "To the capital, north."
props list
```

Overrides change one instance without touching the type: its short, its description, its material, a colour or what it depicts, extra words it answers to, flags such as `nailed` that block an action (a chair nailed to the floor cannot be tipped), and the inscription with its language.

Converting an area from rooms to locations keeps what its `add_item` calls declared: an item named like a catalogue type becomes a prop of that type, once per location, and a prop the builder removed by hand is not added back on a later conversion. Types the room's description only mentions are listed as suggestions for whoever does the conversion, since prose names things in passing.

The source code is in the [Hexagon repository](https://github.com/maldorne/hexagon).
