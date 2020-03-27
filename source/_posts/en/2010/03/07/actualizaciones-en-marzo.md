title: Actualizaciones en Marzo
categories:
  - Novedades
  - Programación
url: 163.html
id: 163
date: 2010-03-07 18:11:09
author:
tags:
---
Este post se irá actualizando a lo largo del mes. **Cambios de juego:**

*   Abierto el nuevo **dominio de Neuburg**, que incluye los caminos adyacentes, la ciudad, el bosque de Meldar y el encinar moribundo de Ükko, el puesto comercial de Lomar y los caminos hasta Mongûl Gathol.
*   Nuevo parámetro para el comando '_calendario_'. Con '_**calendario años**_' se puede ver una lista de todos los años de la presente era con sus nombres (desde el año uno, de la _Rata oriental_, hasta el presente en el momento de escribir estas líneas, año 51, del _Perro sigiloso_).
*   Cambiada la clase _Pícaro_ por **_Explorador_** (en el sistema de creación de nuevos personajes, en las fichas ya creadas con la clase _pícaro_, y en todos los personajes no jugadores del juego).
*   Actualizados los (escasos) edificios en juego al nuevo tipo de objeto edificio: **La Torre del ángel** de Dargaad, la **Torre de las estrellas** de Neuburg y la **Gran columna** del cementerio de Selozar. También actualizadas (y abiertas por primera vez) las torres de vigilancia de las tres puertas de Dargaad.
*   Abierto el nuevo **dominio de Mongûl**: ciudad completa en tres zonas (_Mongûl, Mongûl Gathol_ y _Mongûl Amras_), minas, forjas, cavernas inferiores, y camino exterior de ascenso a las montañas. Tres puntos de exploración, dos nuevas misiones y nueva casa de cazadores con nuevas misiones para el oficio.

**Cambios y actualizaciones de librerías en su versión v0.6:**

*   **Creado un nuevo sistema de enciclopedias**. Ahora tanto los libros como los diarios que llevan los jugadores utilizan un sistema común de artículos y textos. Los jugadores irán leyendo nuevos textos, añadiéndolos así a su propia enciclopedia personal (no tendrán los textos disponibles hasta haberlos obtenido). Para ver cómo crear textos, consultad _/doc/wiki/README._
*   El mapa ya no puede consultarse en habitaciones acuáticas.
*   Nuevo tipo de objeto **_/std/building.c_**, genérico para lugares a los que se puede entrar, para que todos realicen las mismas comprobaciones y den los mismos tipos de mensajes. Únicamente hay que indicar su género, si están o no abiertos, y su localización de destino. Realizan comprobaciones de monturas, escondidos, etc.