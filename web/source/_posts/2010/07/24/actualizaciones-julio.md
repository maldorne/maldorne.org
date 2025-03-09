---
title: Actualizaciones Julio
tags:
  - aenures
  - armaduras
  - dotes
  - gremios
  - misiones
categories:
  - updates
  - coding
  - capital city
url: 197.html
id: 197
date: 2010-07-24 19:07:13
author:
language: es
---

Este post se irá actualizando a lo largo del mes (de lo poco que queda, claro). **Cambios de juego:**

* Los nuevos jugadores _aenures_ ahora comenzarán a jugar dentro de _Ciudad Capital_, en lugar de hacerlo en _Neuburg_, como venía haciéndose hasta ahora. La zona de _Ciudad Capital_ está mejor preparada para jugadores de nivel bajo, mientras que en _Neuburg_ avanzar los primeros niveles podía hacerse muy cuesta arriba.
* Añadidos algunos elementos de armadura nuevos en determinadas tiendas del juego para facilitar el conseguir los conjuntos de armadura más sencillos.
* Ahora es necesario volver a las habitaciones de los gremios para avanzar sus niveles. Más información un poco más abajo, en "_Nuevo sistema de avance de niveles de gremio_".
* Añadida una nueva forma de obtener el _**Símbolo de Rhael**_ dentro de la metrópolis de _Ciudad Capital_.

**Cambios y actualizaciones de librerías en su versión v0.6:**

* Mejorados los _logs_ de entrada y salida de usuarios.
* Mejorados los comandos de programador _head_ y _tail_ para facilitar el visionado de _logs_.
* Mejorado el comando _ranking_ para programadores, para facilitar el borrado de entradas en la clasificación, y con borrado de clasificaciones vacías de modo automático.
* Mejorado el sistema de ayuda para dotes y hechizos: ahora admite palabras aproximadas según un diccionario; por ejemplo, "_ayuda herboristeria_" y "_ayuda herboristería_" devuelven los mismos resultados, con y sin acento. También son válidas las ayudas si se escribe "_ayuda dote < nombre >_" o "_ayuda hechizo < nombre >_".
* Solucionado bug que impedía empuñar determinadas armas al pertenecer a un gremio. En este mud no se impide utilizar ningún arma independientemente del gremio o clase al que pertenezca el personaje.
* Nuevo sistema de **armaduras por piezas**: Todas las piezas siguen siendo equipo exactamente igual que antes, y se usan del mismo modo que antes. La única diferencia es que, al mirarlos, algunos de ellos dirán que pertenecen a un **conjunto de armadura** con un nombre determinado. Una de las piezas (generalmente el peto), será la principal, y al mirarla os aparecerá información del nombre de todas las piezas que conforman el conjunto completo. Si vuestro personaje lleva vestidas sólo algunas de las piezas, el funcionamiento será el de siempre, pero si consigue llevarlas todas (comprándolas, robándolas o como sea) estas tendrán algún efecto añadido, que dependerá del conjunto concreto. **Por ejemplo**: La nueva _armadura de cuero_ está formada por: _peto de cuero, brazaletes de cuero, par de botas, pantalón de cuero y par de guantes_. Además de los efectos individuales de cada elemento, si un jugador viste todos estos objetos a la vez ganará un punto de armadura adicional mientras los vista.
* Mejorados los _logs_ de avance de niveles de clase y gremio.
* Nuevo sistema de **avance de niveles de gremio**: ahora es necesario volver a la habitación central del gremio para avanzar los niveles, y además de haber conseguido toda la experiencia necesaria, existirá una _**quest**_ que habrá que realizar para que esté permitido avanzar el nivel. Estas misiones serán diferentes para cada nivel (y, obviamente, para cada gremio), y marcan además el nivel máximo al que se puede avanzar: mientras el gremio vaya proporcionando misiones, se pueden seguir avanzando niveles. Además este tipo de misiones especiales de gremio se marcan específicamente en el registro de quests activas (comando _misiones_). Si por alguna razón el jugador borra o pierde la misión de gremio actual, con volver a pasar por la habitación central esta se reasignará automáticamente.**Hay que recordar que**, pese a ser necesario volver al gremio para subir su nivel, la categoría básica del personaje (su _clase_, bien sea _guerrero_, _explorador_, _erudito_, etc.), no lo necesita, ya que los niveles de clase se suben automáticamente allá donde esté el jugador.
* Mejorados los _logs_ de misiones terminadas, e incluidas en ellos las misiones de gremio.
* Mejorada la detección de cuándo se pueden realizar acciones con una montura.
