---
title: 'Nueva funcionalidad: Multimud'
tags:
  - canales
  - ftp
  - login
  - multimud
categories:
  - blog
url: 10.html
id: 10
date: 2009-07-07 18:43:50
author:
language: es
---

Para facilitar la administración a la hora de utilizar dos servidores en una misma máquina, se ha añadido una nueva funcionalidad que se configura desde el archivo _/secure/multimud.h_. Ahora, con comentar o descomentar un par de líneas, se hace muy fácil tener funcionando dos servidores distintos con las siguientes características:

* Canal _cre_ para programadores compartido entre ambos servidores.
* Establece servidores _ftp_ en los dos Muds, escuchando en distintos puertos (3007 y 3008).
* Se muestran distintos mensajes de bienvenida al conectar a cada uno de los Muds, diferenciando así entre un servidor de juego y otro de desarrollo.
* Se impide la posibilidad de que programadores sin permisos de administración se conecten al servidor de juego, permitiéndoles únicamente conectarse al servidor de desarrollo (administradores y usuarios básicos podrán conectar en ambos puertos indistintamente).

Para más información, [la página de la Wiki correspondiente](http://wiki.ciudadcapital.net/index.php?title=Multimud).
