---
title: 'A Town That Lives by Itself'
date: 2026-10-16 10:00:00
author: neverbot
tags:
  - mud
  - hexagon
  - lpc
  - npc
  - game-development
  - architecture
categories:
  - hexagon
---

It is common for a MUD room to own its NPCs. The pub clones its barman on reset, the gate clones its guards, and when the room leaves memory they go with it. The next barman is a fresh clone with the same name. That works until you want a town where people have a job, a house and hours to keep, and still have them after a reboot.

In [Hexagon](https://github.com/maldorne/hexagon) the people of a game belong to its areas. A location clones nobody: the area keeps its population as data, and when a location loads, the area brings in the people who stand there. This post follows that system from the template to the hourly round. It builds on the [location system](/2025/01/23/from-rooms-to-locations-an-ecs-approach/).

<!-- more -->

## Template, post, individual

The template is the type: how the people of a kind look and talk, their names, descriptions, chatter, temperament and the components they carry. It is a JSON file per language, written by hand and versioned with the game.

The vacancy is the post: a job the settlement offers, with its seats, workplace, class, kit, timetable and house. The area stores it.

The individual is one person, with a uuid, a generated name, gender, level, race, inventory, purse and workplace, saved in their own file and listed in the area's census.

Kept apart, the town can change without touching its people. Two pubs are one `barman` job with two seats, and a change to the job's kit reaches the next hire while the barman already at work keeps what he has.

## Counted and tracked

A template says whether its type is sentient, and that flag splits the population in two.

Fauna and vermin are counted. The area keeps, per location, how many of each type should be there, with no uuid or savefile behind them. When the location loads it clones whatever is missing, with gender, level and kit rolled fresh, and they vanish when it unloads.

People are tracked. Each one is a census row saying which template they come from, where they stand and which job they hold, and everything personal lives in their own file. Taking somebody on builds and saves them but places nothing; they appear when their location loads.

The caps come from the old rooms. Converting a room to a location records how many of each NPC it used to clone, and the area adds those counts into its roster. A sweep driven by cron then tops up one area at a time toward the caps without loading any location, at most ten NPCs per pass. The sweep covers fauna and the people who hold no post, such as the travellers on a road. A death frees a slot at once and a later sweep fills it, usually somewhere else.

## Points of interest

A point of interest marks a location the world cares about: a pub, a shop, a town entrance, a square, a crossroads, a shrine. Pubs and shops are marked from their location components during conversion, and a builder adds the rest. Guards read their orders from the one at their post.

## Vacancies

Every job has the same record: a name, a number of seats, the location where it is held, the types its holders are drawn from, and optionally a class, a kit, a timetable, the spots where it is worked and a house.

The record never says who does the job. Holders are read from the census, so when one dies the seat is simply open.

My examples come from the royal palace of Takome, in [Reinos de Leyenda: Aeternum](/games/#Hexagon), one of the games built on Hexagon. Its job names are the game's own Spanish words: `trono` is the throne, `palacio` the palace, `muralla` the wall, `plaza` the square, and `dia` and `noche` are day and night. A job can draw from several types by weight, and the builder writes it like this:

```
build vacancy add palacio-dia 4 <area>/npcs/guard-luna*6,<area>/npcs/guard-luna-knight*3,<area>/npcs/guard-luna-captain
```

Four seats, and each hire is rolled among plain guards, knights and a captain at six to three to one.

The timetable belongs to the job. It maps a game hour to a destination (`work`, `home` or a location) and an optional message, free text the room sees as the holder sets off:

```
build vacancy timetable palacio-dia 7 work $mcname$ takes over the watch at the gate.
```

Day and night watches are two jobs. This is the palace's day watch after staffing:

```
> vacancies palacio-dia
Job 'palacio-dia' of 'takome/ciudad/edificio/rooms'
  type       areas/takome/ciudad/edificio/npcs/guard-luna *6, areas/takome/ciudad/edificio/npcs/guard-luna-knight *3, areas/takome/ciudad/edificio/npcs/guard-luna-captain *1
  seats      4, held 4, 0 free
  worked at  entrada-palacio.o (loaded)  poi town_entrance "Puerta del Palacio"
  spots      entrada-palacio.o, camino-02.o
  house      dormitorio-01.o  (the post's own)
  class      -
  kit        chain-mail, long-sword
  hours      7h work (says so), 19h home (says so)
  post       spread over the places it lists
  holders
    Emerek (level 8)  at dormitorio-01.o  works entrada-palacio.o
    Odaline (level 12)  at dormitorio-01.o  works camino-02.o
    Leofrick (level 8)  at dormitorio-01.o  works camino-02.o
    Morna (level 12)  at dormitorio-01.o  works entrada-palacio.o
```

The post is held at the palace gate ("Puerta del Palacio"), a town entrance point of interest. Its two spots split the guards between the gate and the way into the royal hall, and its house is a dormitory (`dormitorio`). They go to work at seven and home at nineteen, and "says so" means each move carries a message.

The kit is a list of interchangeable items per slot; each holder rolls one at creation and keeps it for life.

Declaring a job hires nobody. Staffing is a step the builder runs once the area is set up: it takes a new person on for each empty seat of every job and then houses everybody. A location load or a death never hires anybody, so a seat emptied by a death stays open until the area is staffed again.

## Births

The area decides everything about a new person once. The name follows the style of the citizenship that holds the area, and the race is drawn from that citizenship's race pool, so a road between two towns names its travellers like the region around it. Nationality is the citizenship at the top of the area's chain unless the template says otherwise. Level comes from the area's band, the template's modifier and a random swing. Class, kit and starting coin come from the job, or from the type for somebody with no post. A template for one particular person, with a proper name, keeps its own name, race and level.

## Materialize and drain

When an area loads a location, it brings in exactly the people the census puts there. It reads each file, reapplies the template, dresses them and, if their job keeps hours, sends them where the current hour says. Somebody who was halfway to work when the location unloaded carries on. The location's fauna is cloned in the same pass.

When the location is destroyed, the area records where each person is, saves them and keeps their rows. A death removes the person for good, row and savefile included.

## Houses and parent areas

The area keeps the books of who lives where. Housing pairs homeless residents into households and founds families once the area's map is marked final.

An area can name the area it belongs to, so a town's streets, fields and roads form one community: the root of that chain answers every population question.

## The hourly round

Cron advances each game's clock and asks its areas who is due that hour. Each area keeps an index from hour to people, so the round only visits areas with work to do. Departures go out a few at a time with short pauses. A person not in the world is brought in by loading their location, then sent on at walking pace.

## Guards

A guard is an ordinary NPC with the guard component, holding an ordinary job. The component watches one exit and stops anybody whose citizenship is at war with its own, and the post adds the rest. At a town entrance it watches the exit into town, and if the entrance admits citizens only, it lets through only its own citizenship and those under it. On a town square it stands by and stops nobody. At a bodyguard point it attacks whoever attacks one of its citizens in the room. In Takome the king's throne room is a bodyguard point, held by `trono-dia` and `trono-noche`.

Repopulation comes next: a town that replaces the people it loses, and a conquered one that fills with another culture.

The whole system, field by field and command by command, is in [population.md](https://github.com/maldorne/hexagon/blob/master/mudlib/lib/location/area/population.md) in the Hexagon repository.
