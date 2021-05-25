---
title: Actualizaciones de Febrero
tags:
  - Del-Khâine
  - mapa
  - Mor-Khâine
  - Mullingar
  - Roth
  - Temail
  - Umroth
  - Zenell
categories:
  - [Novedades]
  - [Programación]
url: 122.html
id: 122
date: 2010-02-02 12:38:30
author:
language: es
---

Este post se irá actualizando a lo largo del mes. **Cambios de juego:**

*   Abiertos nuevos caminos en las orillas del **río Temail**.
*   Abierto el nuevo camino de descenso de la cordillera de **Mor-Khâine**, por su ladera oeste, desde la fortaleza de Del**-Khâine** hasta las lindes del **bosque de Umroth**.
*   Abierto el propio **bosque de Umroth**, las **colinas de Mullingar**, y las cavernas bajo el bosque.
*   Abiertas las **Ruinas de Zenell** y el **Camino Prohibido**.
*   Nuevo comando _**mapa**_ para ver tu posición en el juego.
*   Corregidos pequeños detalles del mapeado en los alrededores del pueblo de _Roth_ y de las _Ruinas de_ _Zenell_ (se veían confusos utilizando el _mapa_).
*   Abierto el **Cementerio Maldito de Selozar**, al final del Camino Prohibido.

**Cambios y actualizaciones de librerías en su versión v0.6:**

*   Arreglado un posible fallo de permisos con la función _cat()_.
*   Nuevo comando _apuntador_, incluida la lógica relativa en el objeto _player_ para recordar el apuntador seleccionado, y mejorada la tabla de apuntadores _/table/hud_table.c_.
*   Ampliada la tabla de _configuración_ _/table/config_table.c_ para incluir información sobre el comando particular que amplía la información de cada entrada de la tabla.
*   Añadida la posibilidad de cambiar entre combate _letal_ y _no letal_ mediante el comando _configuración_ (_configuración entorno incapacitar sí/no_).
*   Comando _monitor_ cambiado para que su funcionamiento sea más similar a todos los demás comandos que configuran el comportamiento del personaje.
*   Cambiada la forma en que se muestran los **listados de los baúles**. Ahora, además de agruparse los objetos contenidos por categoría (armas, armaduras, escudos y otros), también aparecerán agrupados por cantidad de objetos de cada tipo, de modo que veremos líneas como: Dos espadas largas, Tres antorchas, Una daga, etc. También se ha cambiado el mensaje sobre la ocupación del total del baúl por un porcentaje.
*   Solucionados algunos posibles fallos con la creación de nuevos _dominios_.
*   Arreglado un error con el _who externo_ (el que puede hacerse antes de conectar). Para evitar futuros problemas con esta funcionalidad se han añadido comprobaciones de la correcta carga de los objetos relacionados.
*   La longitud máxima de los _alias_ se ha aumentado.
*   Arreglado bug en el antiguo _manejador de comandos_ (_/cmds/handlers/cmd_handler.c_) que repetía datos innecesarios y podía dar errores (descubierto con la nueva funcionalidad de listado de comandos).
*   Ahora la **lista de dotes** (comando 'dotes') se muestra ordenada por categorías (cada oficio, combate desarmado básico, combate con armas básico, etc.).
*   Añadido un **modo "silencioso" para el comando sar** (_search and replace_) para cuando sea necesario editar grandes colecciones de archivos. Con '_sar -s $patrón a buscar$ $nuevo texto$ <archivos>_' el comando no muestra mensajes por pantalla, lo que favorece la velocidad de edición enormemente.
*   Añadido el parámetro '_here_' al comando _fsearch_. Así es factible realizar un _**fsearch here**_ y comprobar las funciones incluidas en el entorno del programador, facilitando así la programación de áreas.
*   Nuevo tipo de **objetos apilables** (_/obj/misc/stackable.c_), creados utilizando una cuerda (_/obj/misc/rope.c_). Sistema aplicado en un principio a proyectiles (flechas y saetas para empezar), pieles de cazadores y hierbas de herboristas.