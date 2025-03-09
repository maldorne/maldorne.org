---
title: Actualizaciones Verano 2012
categories:
  - updates
  - coding
  - capital city
url: 303.html
id: 303
date: 2012-09-17 17:30:16
author:
language: es
tags:
---

**Cambios de juego:**  

*   Arregladas las salidas del **Alcázar Hierro Negro**, ya no se podrá ir por los pasillos a caballo.    
*   **Monturas:** ahora por defecto el juego supondrá que tienen los mismos gremios, oficios, ciudadanías, etc que sus dueños, por lo que no se producirá ningún problema como que un guardia permita pasar a un jugador y no su montura.
*   Mejoradas las **entradas secundarias**/secretas de **Mongûl**.    
*   **Monturas**: Ahora la descripción de la montura identifica a su dueño. También se ha mejorado la forma de invocar a las monturas desde la piedra de hogar.    
*   Puestas en juego las **pociones de los alquimistas**, basándose en el nuevo sistema de recetas. La primera misión al respecto, disponible en las escuelas de _Ciudad Capital_ y _Dargaad_, permite aprender a crear la **poción balsámica** para regeneración de vida.
*   Añadidos los **viales** a las tiendas generales de las escuelas de alquimia.
*   Ahora se informa al conectar al juego, en las primeras líneas, de la **fecha del último parche** que se ha aplicado al juego (fecha en que se han incluido los cambios del puerto de desarrollo en el puerto abierto a jugadores).
*   [Revisados todos los no-muertos](http://www.ciudadcapital.net/archivo/revisados-los-no-muertos/), especialmente los del _Cementerio de Selozar_. Ahora hay tres tipos: animados, revividos y exánimes.
*   Nuevo comando "_combates_" para consultar la lista de objetivos contra los que estás combatiendo actualmente.
*   Cambiados los estilos de combate con armas por [maestrías](http://www.ciudadcapital.net/archivo/modificaciones-al-sistema-de-combate-maestrias/).

**Cambios y actualizaciones de librerías en su versión v0.8:**

*   Mejorados algunos detalles del sistema de **parches** automáticos del juego.
*   **Cambiada la forma en que se suben niveles**: ya no habrá un componente de azar, por lo que el número de puntos de vida y energía que se ganan estarán en relación a las características y a la clase del personaje. Para que no haya problemas con los jugadores existentes, según vayáis entrando se recalcularán todas las fichas. Los puntos anteriores y los nuevos están siendo grabados, de forma que si detectamos que estadísticamente los personajes están perdiendo más puntos de los que ganan con este cambio, se volverá a aplicar otra corrección. Pero si habéis perdido algún punto de vida o de energía no os preocupéis por ello, por lo general vais a salir ganando.
*   Solucionado un posible _bug_ con las **antorchas** que hacía que la antorcha se "agotase" de forma errónea en algunas ocasiones. Añadido ahora una nueva línea en la descripción que informa de cuanto uso le queda a cada antorcha.
*   Ahora las **dotes que fallan** (el contrario esquiva tu golpe, por ejemplo) también provocarán un bloqueo de unos segundos hasta que se pueda volver a intentar. Este bloqueo será de la mitad de tiempo que si la dote hubiera terminado exitosamente.
*   Arreglado _bug_ con el comando _ls_ cuando se intentaba acceder a rutas inválidas.
*   Rehecho por completo el **sistema de recetas/patrones** para construir objetos. De cara al jugador es transparente, pero todo el código de librerías que gestiona las recetas es ahora distinto. Cada patrón es un archivo propio en _/obj/recipes_, con la información necesaria sobre qué ingredientes/componentes necesita, qué objeto crea, etc.
*   Terminadas las pociones de alquimistas.
*   Sustituidos los directorios _/w_ por _/home_, y actualizadas las librerías al completo para tener en cuenta los cambios que implica.
*   Cambiadas todas las apariciones de rutas sin la barra inicial, añadiéndola donde no estaba. Por ejemplo, cambiando _"obj/classes/..."_ por _"/obj/classes/..."_.
