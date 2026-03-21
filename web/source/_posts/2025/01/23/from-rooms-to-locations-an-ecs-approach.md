---
title: 'From Rooms to Locations: An ECS Approach'
date: 2025-01-23 22:00:00
author: neverbot
tags:
  - ecs
  - mud
  - lpc
  - hexagon
  - game-development
  - architecture
categories:
  - hexagon
---

One of the biggest architectural changes in our MUD engine [Hexagon](https://github.com/maldorne/hexagon) is replacing the traditional room system with a new location system built around an Entity Component System (ECS) pattern.

## The Problem with Rooms

The classic MUD room is a monolithic object. A room that contains a shop has to inherit from a shop class. A room with a pub inherits from a pub class. If you want a room that is both a shop and a pub, you need multiple inheritance, which in LPC gets messy fast. And then you want to add a sign, or make it dark at night, or have an NPC attendant, and you end up with inheritance chains five levels deep where half the code is workarounds for the other half.

## Components Instead of Inheritance

The ECS approach flips the model: a location is a container, and features are components you attach to it. A [shop](/2021/10/19/shops-fully-operative-and-translated/) is a component. A [pub](/2021/11/05/pubs-fully-operative/) is a component. Having climate effects is a component. You can mix and match them freely without worrying about class hierarchies, because you compose locations by mixing components, not by stacking class hierarchies.

In practice, this means a location file could look something like this:

```lpc
// A tavern that also sells equipment
add_component("shop", ([
  "items": (["sword": 100, "shield": 150]),
]));

add_component("pub", ([
  "menu": (["ale": 5, "mead": 7]),
]));

// And this location is outside and has weather effects
add_component("outside");
```

Each component manages its own state and responds to player actions independently. When a player types `look`, the location queries all its components for their descriptions. When a player types `buy sword`, the location routes the action to the component that responds to `buy` actions, which checks if it has that item for sale.

## What Changed

The conversion touched almost every part of the codebase that dealt with rooms:

- **Actions and targets**: the action system now treats components as valid targets. If a location has a shop component, `buy` and `sell` work without the location needing to know anything about commerce.
- **Builder tools**: `call function() @component`: now you can call functions directly on components from the command line, which makes testing and debugging much easier. 
- **Darkness and weather**: the dark/night/outside system was refactored to work as a location property rather than a room class feature.

The old room system still works. We did not break backwards compatibility. Rooms and locations coexist, and you can convert rooms to locations incrementally.

## Ventures: Managing It All

Along with locations, we built a new `ventures` handler. A venture is any player-facing business in the game world: a shop, a pub, etc. The handler tracks all of them across all areas, and the `ventures` admin command lets you list, inspect, and manage every venture in the system from one place.

Also, every behaviour that a venture can have has been refactored so we can share the code between the location system and the old room system. So if you have a shop in a room, it uses the same underlying code as a shop component in a location.

## Next Steps

The plan is to gradually convert existing rooms to locations in the different games in Hexagon. We will be also adding new components and features to the location system as we go, such as support for dynamic events, more complex NPC interactions, and better integration with the quest system. The goal is to have a flexible, modular system that can support a wide variety of locations and gameplay styles without needing to rewrite code every time we want to add a new feature or mix and match different types of locations. The old room code will stay around for a while, both for compatibility and because some simple rooms do not need components at all.

The source code is available in the [Hexagon repository](https://github.com/maldorne/hexagon).
