---
title: 'MUD Emotes Reworked: The Souls System'
date: 2025-01-18 21:00:00
author: neverbot
tags:
  - mud
  - hexagon
  - emotes
  - lpc
  - localization
  - game-development
categories:
  - hexagon
---

The soul system in [Hexagon](https://github.com/maldorne/hexagon) has been completely reworked. Souls (also called emotes or social commands in other MUD codebases) are what lets players express themselves beyond game mechanics: waving, laughing, hugging, sighing, facepalming. The stuff that turns a text game into a social space.

## Why This Took So Long

Hexagon is bilingual. Every soul needs to produce correct output in both English and Spanish, accounting for verb conjugation, gender, target presence, and self-targeting. "You wave at John" becomes "Saludas a John" in Spanish, but "John waves at you" becomes "John te saluda". Multiply that by about 80 different souls and every possible combination of arguments.

The original soul data was a tangled mix of code and translated strings. Pulling them apart into clean data files (`soul-data.en.h` and `soul-data.es.h`) meant going through every single soul and testing every variation.

## How It Works

Each soul has up to four different message patterns depending on context:

1. What you see when you do it (no target)
2. What the target sees
3. What others in the room see

And then, maybe some souls can't have targets at all, some other maybe only have self-targeting messages, or cannot be self-targeted. 

For a soul like `bow`:
- You type `bow` and see "You bow gracefully."
- Others see "Neverbot bows gracefully."
- You type `bow john` and see "You bow before John."
- John sees "Neverbot bows before you."

And then you can add adjectives to the soul, like `bow deeply`: with this particular example, you could bow solemnly, deeply, formally, hastily, slightly, respectfully, insolently, clumsily, gracefully, dexterously, wildly or colorfully. And all of these combinations need to exist in both languages.

## The Drunk Factor

On top of the souls rework, the intoxication system (`drunk.c`) was translated and connected to the soul output. A drunk character does not just type garbled text. Their emotes change too. Being drunk affects how souls display, adding slurring and stumbling to the output. And some chances of burping, puking, or some other fun drunk behaviour. This is the kind of detail, together with [shops](/2021/10/19/shops-fully-operative-and-translated/) and [pubs](/2021/11/05/pubs-fully-operative/) working as [location components](/2025/01/23/from-rooms-to-locations-an-ecs-approach/), that makes a MUD feel alive. Nobody needs it, but once it is there, players notice.

## What's Next

The soul system is working in both languages. The data files are clean and adding new souls is straightforward: define the four message patterns in each language file and the system picks them up.

The source code is available in the [Hexagon repository](https://github.com/maldorne/hexagon).
