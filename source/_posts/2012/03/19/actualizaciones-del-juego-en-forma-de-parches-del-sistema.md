---
title: Actualizaciones del juego en forma de parches del sistema
categories:
  - Administración
  - Novedades
  - Programación
url: 299.html
id: 299
date: 2012-03-19 18:17:40
author:
tags:
---

Este mes, como principal novedad, se ha construído un nuevo **sistema de aplicación de parches** a toda la _mudlib_. A partir de ahora se trabajará únicamente sobre un segundo servidor de desarrollo (_ccmud-development_, misma máquina en el puerto 5000) en el que se harán todos los cambios de código, tanto en librerías como en el mundo de juego. Cada vez que se decida que se han hecho los cambios suficientes, se lanzarán los _scripts_ del sistema de parcheado que compararán ambos servidores, realizando todas las actualizaciones necesarias.

Esto nos permite dos cosas: por un lado, facilitar el trabajo al estar seguro de que nada de lo que se está realizando puede romper la experiencia de juego en el servidor abierto al público, y por otro estar seguro de que no se va a perder ninguna actualización, ya que periódicamente se van a comparar los entornos completos.

Además, también es un avance en seguridad, ya que se compara todo el mundo de juego y librerías, quedando en un _log_ todos los cambios aplicados. Esto imposibilita que algún programador malicioso modifique el entorno de desarrollo y sus cambios se propaguen al entorno de juego, dado que con cada parche se revisa qué es lo que se ha modificado y lo que no.

Aprovechando algunos cambios menores en la librería, se ha aplicado este nuevo sistema de parches para avanzar a **ccmudlib v0.8**.