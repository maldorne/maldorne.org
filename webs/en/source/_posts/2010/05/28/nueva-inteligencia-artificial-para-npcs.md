title: Nueva inteligencia artificial para npcs
tags:
  - inteligencia artificial
categories:
  - [Novedades]
  - [Personajes]
  - [Programación]
url: 177.html
id: 177
date: 2010-05-28 14:10:14
author:
language: es
---
Ha pasado un tiempo desde la última actualización, que se ha ocupado en el desarrollo de esta nueva funcionalidad: ahora algunos personajes no jugadores contarán con nuevos tipos de comportamiento. En principio sólo se cambiarán algunos de los personajes más poderosos (para empezar el _**Zombie de Fingol**_ y el **_Insector_**, otros se irán añadiendo durante los próximos días), que tendrán nuevos comportamientos y escogerán cómo, cuándo y dónde atacar a sus enemigos.

Este sistema se irá ampliando durante los próximos días con algunos nuevos comportamientos, que se añadirán a las nuevas formas de combate y huida que tienen ahora. El próximo de ellos: búsqueda inteligente de enemigos en zonas cercanas. Se añadirá dentro de unos días para que os vaya dando tiempo de probar los nuevos cambios sin que sean demasiado radicales.

**Para los programadores:**

Se ha intentado que el nuevo sistema sea completamente transparente a la programación de _npcs_, con cambiar el archivo de herencia desde _/std/monster.c_ a _/std/ai.c_ todos los nuevos funcionamientos ya estarán incluidos. Dado que estos personajes se moverán mucho, es recomendable que sean únicos ( *set_only_one(1)* ), para evitar problemas. Por tanto, se recomienda aplicar este sistema de inteligencia artificial únicamente a personajes especiales, no indiscriminadamente.

**Actualización**: Primeras ampliaciones al sistema de inteligencia artificial ya en juego:

*   Los _npcs_ tienen diferentes formas de **alejarse de las zonas peligrosas**, intentando alejarse lo máximo posible o dando vueltas buscando a su próxima víctima.
*   Ahora también tienen un modo de **búsqueda de enemigos**, localizarán a uno de sus anteriores atacantes, se aproximarán hasta él y utilizarán sus distintas dotes. Se avisa al jugador cuando está siendo objetivo de esta persecución para que no crea que está en un lugar a salvo, aún cuando no parezca haber nadie en los alrededores.