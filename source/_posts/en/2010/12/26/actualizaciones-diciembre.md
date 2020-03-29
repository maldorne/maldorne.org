---
title: Actualizaciones Diciembre
categories:
  - [Novedades]
url: 238.html
id: 238
date: 2010-12-26 18:25:43
author:
tags:
---

**Cambios de juego:**

*   Algunos cambios en la nomenclatura de determinadas localizaciones, como las ciudades de **Nodd** y **Del-Khâine**, y el **Valle de las nieblas**.
*   En el proceso de creación de nuevos jugadores, si sólo existe una raza jugable (como es el caso actual, con _humanos_), este paso ahora se salta y se procede directamente a escoger la subraza o cultura relacionada (teniendo ahora disponibles _aenures_, _tresios_ y _velan_).
*   Ahora todos los jugadores se agrupan en **cuentas de usuario**. Cada usuario tiene una cuenta, con sus mismos datos (nombre de usuario y contraseña, _email_, etc.) en la que se pueden crear múltiples personajes jugadores. Se recomienda crear los distintos personajes dentro de una misma cuenta, ya que así contarán con diversas ventajas que no se darán cuando jugadores de distintas cuentas tengan que interactuar.
*   Ahora los **datos personales** (_nombre real_, _ciudad_, _dirección de email_) se comparten entre todos los personajes de una misma cuenta, por lo que cambiarlos desde cualquiera implica cambiarlos para todos. Esto ahora se hace mediante el comando **datos**.
*   Nuevo sistema de viajes: [Rocas de invocación](http://www.ciudadcapital.net/archivo/nuevo-sistema-de-viajes-rocas-de-invocacion/).

**Cambios y actualizaciones de librerías en su versión v0.7:**

*   El sistema de ayuda ya incluye los comandos _cmds_ (desde _/global/player/help.c_ ahora se consulta también la lista de _cmds_). Sólo se muestra la ayuda de aquellos comandos para los que el jugador tiene permiso de ejecución.
*   Arregladas las razas de multitud de _npcs_, tras eliminar los subdirectorios _subraces_ de _/obj/races_.
*   Ahora las habitaciones de inicio (creación de personajes) reaccionan dependiendo de cuántas razas estén disponibles (jugables) en el juego, permitiendo que el proceso sea más corto.
*   _/save/explorers_ y _/save/mounts_ ahora se guardan con distintos subdirectorios según la inicial del nombre del usuario (_/save/mounts/p/pepito.o_ por ejemplo), para evitar que haya un exceso de archivos en un único directorio.
*   Creado el sistema de cuentas: nuevo sistema de _login_, y de creación y borrado de personajes.
*   Mejorado el sistema de **retirar personajes** (que ahora funciona por cuentas). Ahora se eliminan también los datos relativos a la exploración, las monturas, y el correo interno del personaje eliminado.
*   Movidas las fichas de los personajes a _**/save/players**_, y revisado el sistema de permisos (_valid_read_ y _valid_write_) para aplicarlo tanto a _/save/players_ como a _/save/accounts_.
*   Revisados y eliminados multitud de archivos obsoletos de _**/include**_.
*   Retirados todos los servicios de _**/net**_ (únicamente se seguirán utilizando el servidor de _ftp_ y el comunicador de canales remotos _remote_cre_). Eliminado todo el código restante y movido lo estrictamente necesario para el funcionamiento de estos dos servicios a _**/secure/net**_.
*   Ahora el sistema de exploración también almacena toda la información relativa a las rocas de invocación que va encontrando cada jugador. _/obj/handlers/explorers.c_ los gestiona y en _/save/explorers/..._ se encuentran los datos particulares de cada personaje.