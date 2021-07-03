title: Actualizaciones de Enero
tags:
  - camorristas
  - dotes
  - Naga Negra
categories:
  - [Administración]
  - [Programación]
url: 95.html
id: 95
date: 2010-01-05 11:35:12
author:
language: es
---
Este post se irá actualizando a lo largo del mes:

**Cambios en el juego**:

*   El gremio de **Camorristas** ha dejado de aceptar nuevos miembros (y cerrará sus puertas definitivamente dentro de poco). Ahora **Tailer** proporciona la dote "**resistir**" por _quest_ en lugar de hacerlo al avanzar niveles de camorrista.
*   Solucionado un fallo con las nagas (que se pueden encontrar sobre todo en el _dungeon_ de la **Caverna de la Naga Negra**). Ahora llevarán su equipo correctamente equipado.
*   **Los enanos de la roca han dejado de existir**, los escasos jugadores que llegaron a crear una ficha con ellos serán actualizados en su próxima conexión. Pasarán de ser _Enanos de la Roca_ a _Tresios_, su ciudadanía pasará a ser automáticamente _Dargaad_, y serán transportados a su nueva ciudad para comenzar allí una nueva vida.
*   Nueva instrucción: '**comandos**' muestra todos los comandos que puede realizar un usuario (jugador o programador). No muestra dotes, hechizos, etc., únicamente comandos.

**Versión de las librerías actualizada a v0.5**

*   Comando **cominfo** de programadores actualizado, ahora también busca y muestra información sobre las acciones relativas a los comandos de _/cmds_.
*   Comandos **people** y **qpeople** de administradores arreglados y actualizados.
*   **Actualizado sistema de** _**quests**_**:**
    *   Ahora es posible crear _quests_ de eliminar jugadores (no sólo personajes no jugadores), tanto de modo genérico (eliminar a tres jugadores, por ejemplo) como con nombre propio (eliminar al jugador x).
    *   Nuevas _quest_ de vencer en pelea (vencer en un combate en modo no letal).
*   Comando **fsearch** de programadores: Ahora busca archivos también en el directorio actual del programador.
*   **Nuevo** **parámetro para el comando misiones/**_**quests**_: _misiones reset_ (sólo para programadores): borra el registro de todas las misiones completadas hasta el momento, lo que es bastante útil para hacer _debug_ de los _questmen_ y probar a realizar las mismas misiones varias veces.
*   Carpetas de correo interno centralizadas en _/save/mudmail_
*   Configuración de _/secure/multimud.h_ movida al más genérico _/secure/config.h_
*   Nueva **opción de guardado común**, que se puede activar en _/secure/config.h_: Si está activada, todos los archivos de guardado de baúles y tiendas se guardarán en _/save_, y sus _logs_ en _/log_, ignorando los _set\_save\_files_ de cada uno de estos objetos.
*   Añadidos **administradores de tiendas** (que pueden ver _logs_ de compras y ventas).
*   Arreglado error tipográfico a la hora de proteger a las monturas.
*   Arreglado error tipográfico con algunas emociones (cuando se realizaban sobre varios objetivos).
*   De nuevo ampliado el comando de programadores **cominfo**, ahora también incluye información sobre los comandos de emociones o _souls_ (que pueden consultarse con '_ayuda emocion_').
*   Algunos cambios al hacer **finger** a un programador.

**Jerarquía de usuarios renovada y librería actualizada a v0.6**  

La antigua jerarquía de usuarios heredada de las librerías de _frmudlib_ ha sido eliminada. Antes se disponía de los tipos de usuario: Jugador, Creador, Patrón, Thane, Alquimista, Semi-Dios y Dios, correspondientes a los objetos _player_, _creator_, _patron_, _thane_, _lord_, _demi_ y _god_ (todos ellos en _/global_). Las jerarquías se han simplificado y **ahora únicamente existen tres tipos de programadores**, quedando:

*   **Jugador** (_player.c_)
*   **Programador** (_coder.c_)
*   **Coordinador** (_coordinator.c_)
*   **Administrador** (_administrator.c_)

Se han cambiado también todos los archivos relacionados en _/secure_, todas las llamadas del resto de las librerías (que ahora utilizan las funciones _query_coder()_, _query_coordinator()_ y _query_administrator()_, por ejemplo), y el sistema de comandos _cmds_, que ahora tiene centralizados los comandos en cuatro carpetas, haciendo más sencilla su gestión.

De este modo **se ha extraído además la jerarquía de programación y administración del sistema de la ambientación del juego**, por lo que los programadores ya no tendrán ningún tipo de relación con deidades, gremios, etc.

**Más cambios introducidos desde la versión v0.6:**

*   Arreglado el comando **memtree** de programadores.
*   Actualizada la forma en que se muestran los **finger** a cualquier usuario, eliminando información no necesaria y señalando de modo más claro la información más relevante para un jugador: raza del jugador y tiempo de existencia desde que creó la ficha.
*   Arreglado un fallo con los programadores invisibles cuando tienen monturas.
*   La nueva opción de guardado común ahora también afecta a las **bibliotecas**. Si está activada (en _/secure/config.h_), los contenidos de todas las bibliotecas del juego se guardan en _/save/libraries._
*   Añadida a los **bancos** la opción de cerrar una cuenta que previamente se haya vaciado, con el comando _cancelar cuenta_.
*   Creada una **tabla para traducciones de nombres** de _finger_ en _/table/finger_table.c_, de modo que ahora los nombres de los dominios son más legibles, por ejemplo cambiando _ciudad_capital_ por _Ciudad Capital_, etc. También funciona a la inversa, pudiendo ahora hacerse un _finger ciudad capital_ o _finger Mor-Khâine_.
*   Solucionados un par de _bugs_ con el **sistema de emociones** (concretamente con cómo se mostraban las ayudas de las emociones), así como algunos errores tipográficos de las mismas. Añadido al sistema de emociones los parámetros _$hnumeral$_ y _$mnumeral$_ para poder utilizar las diferencias entre _un_ y _una_ por el género. Por ejemplo, al utilizar la emoción _confesar_, ahora se mostrará: _Confiesas ser un adicto a Ciudad Capital_, o _Confiesas ser una adicta a Ciudad Capital_, dependiendo del género del jugador.
*   Actualizado el sistema de **permisos de lectura** para que afecte al directorio de comandos **_/cmds_**. Ahora, los programadores sólo tendrán acceso de lectura sobre los comandos que también puedan ejecutar; por ejemplo, un programador no podrá ver los comandos de coordinador o superior, ni un coordinador podrá ver los de administrador.
*   Arreglado un pequeño fallo con _query\_multiple\_short_ a la hora de mostrar el inventario de un jugador.