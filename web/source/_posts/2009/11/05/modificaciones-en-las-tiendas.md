---
title: Modificaciones en las tiendas
tags:
  - negocios
  - tiendas
categories:
  - coding
  - capital city
url: 74.html
id: 74
date: 2009-11-05 13:17:52
author:
language: es
---

Como sabéis, **las tiendas en Ciudad Capital** tienen un funcionamiento persistente, al contrario que en muchos otros _muds_. Aquí, los objetos que vendáis a las tiendas no desaparecerán con el siguiente reinicio de las mismas, sino que serán persistentes. Lógicamente, para evitar un llenado total y absoluto de las tiendas, se ha añadido un nuevo sistema de "_destockaje_" que se encarga de revisar **aperiódicamente** las mismas para eliminar el equipo básico que no deba estar en ellas.

Resumiendo:

* El equipo que los administradores añadan a las tiendas (está programado) será estable. Cuando el stock se vacíe, las tiendas repondrán al pasar un tiempo. Es decir, puede darse el caso de que no tengan un determinado elemento, pero lo repondrán pronto.
* El equipo que los jugadores vendan a la tienda y no sea básico, permanecerá siempre en ella hasta que otro lo compre.
* El equipo que los jugadores vendan a la tienda y sea básico, permanecerá en ella durante un tiempo indeterminado y, si nadie lo compra antes, acabará por ser descartado.
