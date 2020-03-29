---
title: Actualizaciones Invierno 2012/2013
categories:
  - [Novedades]
url: 335.html
id: 335
date: 2013-01-07 15:33:46
author:
language: es
tags:
---

Este post se irá actualizando con las nuevas novedades según se vayan produciendo, ¡estad atentos!

**Cambios de juego:**  

*   Ahora los jugadores tienen disponible una **actitud de combate** (por defecto al conectar será siempre _ofensiva_, para que no se noten cambios con respecto al modo de juego hasta ahora). Esta se puede cambiar entre los distintos tipos con el comando "_actitud_". La actitud de combate seleccionada en un momento concreto define qué dotes pueden utilizarse y cuales no. Dado que en _Ciudad Capital_ un mismo personaje puede entrar y salir de varios gremios, y así aprender múltiples dotes de toda condición (ofensivas, defensivas, combate cuerpo a cuerpo, a distancia, magia, etc), esta es la forma de limitar que los personajes más avanzados no puedan realizar cualquier acción que quieran, para balancear sus capacidades con las de otros jugadores. Una vez seleccionada una actitud, podrán realizarse todas las acciones relacionadas que se deseen, pero hasta que no hayan pasado unos minutos no se podrá cambiar de nuevo. Para facilitar esto, al intentar ejecutar una dote, si ya ha pasado el tiempo suficiente este cambio será automático para el jugador. El cambio se puede realizar indistintamente en mitad de un combate, lo que puede facilitar estrategias de equipo como pueden ser llegar en modo defensivo y a la mitad del combate cambiar al ofensivo, coordinando ataques con otros jugadores. En estos momentos hay tres modos seleccionables:
    *   Actitud **ofensiva**: permite comandos de ataque que realizan daño a los enemigos.
    *   Actitud **defensiva**: permite comandos defensivos, resistencia de ataques, y ofensivos que aumenten la agresividad en lugar de realizar daño.
    *   Actitud **de apoyo**: curaciones, cánticos y mejoras en general sobre las capacidades de otros jugadores.
*   Ahora en la **ficha** de cada jugador se puede consultar el **tipo de combate** (letal o no letal, se cambia con el comando _combate_) y la **actitud de combate** (ofensiva, defensiva, de apoyo, etc, se cambia con el comando _actitud_).
*   Arreglada la dote "**resistir**" que funcionaba incorrectamente.
*   Nueva **clasificación de dotes** según la actitud de combate que requieren para ser ejecutadas, en el caso de requerir alguna. Esto se puede consultar en la ayuda de cada dote particular.

****Cambios y actualizaciones de librerías en su versión v0.8:****

*   Modificaciones al **sistema de combate**: cada objeto viviente (jugadores y no jugadores) ahora además de llevar contadores internos de cuánto daño les ha realizado cada enemigo (útiles, por ejemplo, para calcular la repartición de experiencia cuando se vence a alguien), ahora también tendrán en cuenta la **agresividad** (**_aggro_**) de cada enemigo, centrando sus ataques en su enemigo más peligroso en lugar de repartir cada ataque de modo aleatorio entre todos los enemigos disponibles. Ahora además de dotes que hacen daño al contrario, también las habrá que únicamente llaman su atención para subir dichos contadores.