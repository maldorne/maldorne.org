---
title: Actualizaciones Agosto
categories:
  - updates
url: 218.html
id: 218
date: 2010-08-10 18:54:36
author:
language: es
tags:
---

Este post se irá actualizando a lo largo del mes.

**Cambios de juego:**

*   **Nueva dote** _**seguir**_, en sustitución del antiguo comando del mismo nombre, con un funcionamiento completamente distinto: no existen los comandos perder ni despistar que existían hasta ahora:  
      
    **Cómo funciona**: si pasas el azar que puede hacer que tu "_seguir_" funcione o no, permanecerá funcionando durante varios segundos (dependiendo del porcentaje de la dote), en los que tu avatar se moverá en las mismas direcciones que el adversario... aunque puede que más rápido o más despacio, los movimientos de ambos jugadores no serán necesariamente simultáneos. Durante los segundos que dure la persecución, el perseguido tendrá que seguir moviéndose, o al final el perseguidor llegará a su misma localización. No existe un comando o dote que evite la persecución "_per se_", sólo se puede correr más, esconderse, o utilizar el sigilo para que el perseguidor no sepa seguir el rastro.  
    
    Todos los jugadores comenzarán con ella al 30%, y los exploradores al 50%. Probablemente sea el primer "_seguir_" libre de _bugs_ que se ha visto en mucho tiempo. Todos los jugadores existentes verán actualizada su ficha según vayan reconectando.
*   Ahora el **apuntador** (el texto que aparece cuando veis a otro jugador) informará de la cultura o subraza, no solamente de la raza principal como se venía haciendo hasta ahora. Ya no veréis "_Pepito el humano llega del norte_", sino que aparecerá "_el aenur_", "_el tresio_", etc.
*   Los **cazadores** tienen una **nueva misión de exploración** en el _Bosque de Porte_ para encontrar un nuevo maestro.
*   **_Bilfheim_** proporciona nuevas misiones a los cazadores: enseña a mejorar la dote _despellejar_ para poder utilizarla con reptiles.
*   Nuevo [sistema de creación de objetos](http://www.ciudadcapital.net/archivo/sistema-de-creacion-de-objetos-herreria-peleteria-joyeria-alquimia/) para cazadores: **Peletería**. Añadida la misión para obtener la dote.
*   Añadida **peletería** en **Sqargeld**.
*   Ahora todos los nuevos jugadores empezarán a jugar en una localización en la que pueden obtener misiones nada más conectar (se ha cambiado para todas las razas jugables).

**Cambios y actualizaciones de librerías en su versión v0.6:**

*   Añadidas funciones de control de arrays *shift_left* y *shift_right*. Revisadas varias *simul_efuns* relacionadas con arrays y mappings.
*   Ahora los objetos _living_ mantienen una pequeña lista interna con información de los últimos _environment_ visitados (ver _/global/living/visited.c_).
*   Eliminado todo el antiguo sistema de _followers_ y _followees_, ahora el seguir se realiza mediante una dote. Simplificado enormemente el movimiento entre rooms en la función *move_player*. Eliminado el archivo _/global/living/follow.c_. Creada la nueva dote seguir que sustituye de un modo mucho más "entendible" lo que había anteriormente. Simplificados *event_enter()* y *event_exit()* en */global/events.c*.
*   **Avanzada la librería a la versión v0.6.2**.
*   Solucionado _bug_ que hacía que algunos nuevos jugadores entraran en el _ranking_ de jugadores cuando en realidad eran invitados.
*   Mejoradas las ayudas de las dotes.
*   **Mejorada la ejecución de dotes** mediante un diccionario. Ahora, además de ser válidas las variaciones del nombre a la hora de ver la ayuda (por ejemplo, "_ayuda herboristería_" con y sin acento) también lo son las variaciones del nombre a la hora de ejecutar la dote (en el caso de dotes _activas_). Por ejemplo, la dote de _Peletería_ puede ejecutarse ahora mediante el comando con y sin acentos.
*   Solucionado posible _bug_ en la obtención de experiencia para usuarios de magia a la hora de ejecutar hechizos.
*   Solucionado un fallo que hacía que se al ejecutar una dote erróneamente (por moverse durante su ejecución, por ejemplo) se pudieran gastar los _puntos de energía_ y se pudiera mejorar el conocimiento de la dote como si se hubiera ejecutado correctamente. **Ahora tanto el gasto de** _**puntos de energía**_ **como el aprendizaje se realizan al final del último turno de la dote**, y únicamente si esta ha terminado correctamente.
*   Terminado el **nuevo tipo de misión "**_**exploración**_**"**, que estaba a medio hacer. Ahora ya es plenamente funcional.
*   Nuevo **[sistema de creación de objetos](http://www.ciudadcapital.net/archivo/sistema-de-creacion-de-objetos-herreria-peleteria-joyeria-alquimia/)**, completamente genérico y preparado para añadirse a múltiples oficios sin cambios (cazadores, herboristas, herreros, joyeros, sastres, etc). Para más información _/global/player/recipes.c_ y las distintas dotes relacionadas en _/obj/feats_.  
*   **Avanzada la librería a la versión v0.7.**
*   Arreglado un _bug_ que impedía utilizar el sistema de generación de características aleatorias a los nuevos jugadores.
*   Algunos cambios menores en la forma en que se ven las descripciones de algunas localizaciones y los objetos agrupables.
*   Especificados los géneros de los distintos grupos de objetos (ya no se verá "_un bolsita de hierbas_"). Arreglados los géneros de algunos objetos, como los _mantos_.
