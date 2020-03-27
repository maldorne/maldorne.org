---
title: Actualizaciones Diciembre 2011
categories:
  - Novedades
url: 272.html
id: 272
date: 2011-12-27 19:38:08
author:
tags:
---

El _Cementerio de Selozar_ y los alrededores han sido revisados intensivamente:

*   Bajados de nivel y características los _murciélagos verdes_ y los _lucernos gigantes_.
*   Eliminados los textos de las lápidas.
*   Arreglados varios errores de descripciones en las _Ruinas de Zenell_.
*   Revisado el _Zombi de Fingol_ (ahora ataca automáticamente).

Otros cambios:

*   Añadidas palas como objetos básicos en multitud de tiendas repartidas por el mundo de juego (en _Ciudad Capital_, _Dargaad, Sqargeld, Del-Khâine, Roth_, varios puestos comerciales y varias tiendas en _Mongûl_).
*   Cambiada la dote _seguir_: si se intenta seguir a alguien con el consentimiento activado (ver comando '_consentir_'), la duración se multiplica por diez, lo que es útil para seguir a aliados, por ejemplo.
*   Para terminar antes de tiempo las persecuciones demasiado largas, se ha ampliado el comando _detener_. Ahora con "_detener persecución_" dejas de seguir a tus objetivos, y con "_detener combates_" paras las peleas en marcha.
*   Aumentada la duración de las antorchas casi hasta el doble (aprovechable en todas las antorchas nuevas que compréis en las tiendas).
*   **Ahora los jugadores**, mientras se encuentren quietos en una misma localización, y no tengan combates activos o pendientes, **recuperarán puntos de vida más rápido**.
*   Revisada la _Naga Reina_ de la mazmorra de _Caverna de la Naga Negra._ Ahora no tendrá nivel aleatorio, siempre será de nivel 13.
*   Revisados los géneros de los años del calendario (ahora se mostrará correctamente "_el año del águila imperial_" en lugar de "_de la águila_". También se han ampliado los nombres que se pueden utilizar en la tabla de años, por lo que habrá más variedad (utiliza el comando '**calendario años**' para revisar los nombres de los años de la presente era).
*   _Esconderse_ ha pasado de ser una dote de "_combate desarmado básico_" a ser una dote de "_exploración_". Esto no afecta para nada a su funcionamiento, sólo a nivel de información (dónde aparece al usar el comando "_dotes_").
*   [Revisado el gremio de cazadores](http://www.ciudadcapital.net/archivo/revisado-el-gremio-de-cazadores/) y sus misiones.
*   Solucionado un _bug_ por el que en ocasiones se podía perder un punto de constitución al resucitar. Mientras no haya formas de recuperar o ganar puntos de característica, tampoco habrá formas de perderlos. **No hay ninguna pérdida permanente por la muerte de un personaje**.

**Cambios y actualizaciones de librerías en su versión 0.7.1:**

*   Eliminadas las funcionalidades de _dig_exit_ de _/std/room.c_, así como el _dig_handler.c_
*   Solucionado fallo con los objetos apilables/agrupables. Ahora, al desatar un grupo de objetos, si tenemos el inventario lleno no se producirá ningún error, y los objetos con los que no podamos cargar se dejarán en el suelo.
*   Si el líder de un _grupo de aventureros_ se desconecta del juego sin haber designado un nuevo líder, este se asignará automáticamente de modo aleatorio entre los demás miembros del grupo (ver comando '_grupo ayuda_' para más información).
*   Nuevas funciones para objetos _player_:
    *   _query\_is\_fighting_: está en combates activos o pendientes.
    *   _query\_is\_moving_: se ha movido durante los últimos turnos.
    *   _query\_is\_quiet_: ninguna de las anteriores (está quieto y sin combates).