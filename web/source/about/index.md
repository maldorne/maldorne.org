---
title: About
date: 2021-11-30 20:33:46
language: en
author: neverbot
---

In the Maldorne non-profit organization we ([we? who are we?](/me)) host several retro-online [games](/games), develop or collaborate in most of them, and create tools and frameworks to help those who are yet working with these technologies.

We created **Ciudad Capital**, the online fantasy game, and have been working on it since 2003.

We are also developing the [**Hexagon** mudlib/framework](https://github.com/maldorne/hexagon/) and tools, which helps developers in creating their own games.

## Timeline

{% timeline %}

{% year "26/27" "Next milestone" "Hexagon v2.2 Edoras" %}
The following milestone, `Edoras`, is about living worlds. We have already reviewed the quest system, citizenships and guards, rivers and bridges, the light system and the world map, and added props as an alternative to items in locations, plus shared houses. Still to come are area-driven NPC population, settlements that replace the people they lose, families and houses, more quest types, crime and guards, and a review of the spell system.
{% endyear %}

{% year "2026" "Stable version" "Hexagon v2.1 Daggerfall" %}
The fourth milestone, `Daggerfall`, brings the first version of **locations**, an alternative to rooms where data and behavior are separated. A location is an *entity* that carries *components*, small objects that each hold one slice of its behavior (a shop, its props, a maze), so any location can be changed by code at run time. NPCs are entities too, with components of their own such as a schedule, a guard post or a toll, and both kinds share the same entity-component core.

Around it we revised the communication and movement commands, the mail system, the combat system and the skill system, and wrote a new help system. Each game now has its own weather and calendar. The mudlib also gained NPCs with hourly schedules, jobs, deities and temples, and guest users.

* 17/09/2026 `v2.1 Daggerfall`
{% endyear %}

{% year "2024" "Stable version" "Hexagon v2.0 Castle Black" %}
The third milestone, `Castle Black`, includes a revision of every command, advances the translation process trying to have every main system in english again, and has finished the first complete demo game: `demo-fantasy`.

It means the move from **alpha** version to a **beta** version, stable and usable enough for other users to create their own games or porting old games from other drivers to `DGD` using `Hexagon`.
{% endyear %}

{% year "2021" "Migrating from older platforms" "Hexagon v1.21.09 Beregost" %}
The second big milestone, `Beregost`, includes a revision of every *initiator object*, the skeleton for the multigame system, continuous integration through [Github Actions](https://github.com/maldorne/hexagon/actions), finishes the conversion of all the remaining basic object types from `ccmudlib`, and includes for the first time a piece of a demo game.

* 25/09/2021 `v1.21.09 Beregost`
{% endyear %}

{% year "2020" "New versioning names" "Hexagon v1.20.09 Anduin" %}
I started working with milestones in Github, naming every big milestone. The first one, `Anduin`, includes the multilanguage system on compilation time (translates contents of files during compilation), separates `user` and `player` objects, and creates the new `login` basic user type to manage connections.

* 01/10/2020 `v1.20.09 Anduin`
{% endyear %}

{% year "2014" "We started moving from MudOS to DGD" "Hexagon v1.19.05" %}
After years of creating content for **Ciudad Capital** using `MudOS` as our MUD driver, I started coding a conversion to the `DGD` driver.

* 07/05/2019 `v1.19.05`
* 27/04/2019 `v1.19.04`
* 14/01/2019 `v1.19.01`
* 18/07/2017 `v1.17.07`
* 26/08/2014 [**First commit**](https://github.com/maldorne/hexagon/commit/4a115fe92941dbee0f8ad5c2a8fcde7b34574aa9) in the `Hexagon` code repository, this was an experiment to see if it was possible to use the `DGD` driver, and evolved with the idea of being the second version of **Ciudad Capital**.
{% endyear %}

{% year "2012" "Work goes on with ccmudlib" "ccmudlib v0.8" %}
Some more working on `ccmudlib` and **Ciudad Capital**, now in professional hostings (OVH and AWS during different years).

* 03/2012 `v0.8`
* 11/2011 `v0.7.1`
* 12/2010 `v0.7`
* ??/2010 `v0.6.2`
* ??/2010 `v0.6.1`
* 02/2010 `v0.6`
* 18/12/2009 `v0.5`
{% endyear %}

{% year "2009" "Final year project in Software Engineering" "ccmudlib v0.4" %}
`ccmudlib v0.4` was the foundation for my final year project in **Software Engineering** (BSc and MSc) at Universidad Politécnica de Madrid.

* 01/12/2009 **Final year project**.
{% endyear %}

{% year "2009" "First versions of the mudlib and the game" "ccmudlib v0.3" %}
For some years I just work on the MUD from time to time, adding features and content to the game, still hosted in a dedicated machine in my own home.

* 13/05/2009 `v0.4`
* 27/04/2009 `v0.3.6`
* 25/03/2009 `v0.3.5`
* 04/08/2008 `v0.3.4`
* 07/07/2005 `v0.3.3`
* 26/10/2004 `v0.3.2`
* 19/12/2003 `v0.3.1`
* 13/07/2003 `v0.3`
* 01/07/2003 `v0.2`
{% endyear %}

{% year "2003" "Started coding my own game: Ciudad Capital" "ccmudlib v0.1" %}
Some time after _Reinos de Leyenda_ closed its doors, I started coding my own game, based in some of the latest features I was working on for the new mudlib, creating a new world and lore.

* 17/01/2003 **First login** to the new game.
{% endyear %}

{% year "1998" "Knowing about MUDs" "Beginnings..." "last" %}
Some time around maybe 1998, I started playing in the _Reinos de Leyenda_ MUD, and I fell in love with text-based games. I played with several classes/guilds, and after some time I became a `creator` (coder) and went up in the hierarchy up to `alchemist` (lesser admin).

With some other coders we started working in a hard-core revision of the codebase, updating the driver version, but the MUD would disappear before the new mudlib could open to the public.
{% endyear %}

{% endtimeline %}
