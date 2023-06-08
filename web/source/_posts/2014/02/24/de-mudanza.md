---
title: De mudanza
categories:
  - blog
url: 381.html
id: 381
date: 2014-02-24 22:02:59
author:
language: es
tags:
---

~Aunque el propio _mud_ ya hace tiempo que estaba alojado en los servidores de **Amazon Web Services**, aún teníamos la _web_ en un _hosting_ distinto. Estos días estamos de mudanza, llevándonos la _web_ al mismo servidor, y aprovechando para remozar todo un poco. Desde el lado técnico, cambiamos la tecnología que sustenta el _blog_, migrando el servidor _web_ de _Apache_ a _Lighttpd_, y cambiando la base de datos de _mysql_ a _MariaDB_. En breve el enrutamiento pasará a estar gestionado por **Amazon Route 53** y estableceremos subdominios para cada servicio:~

*   ~[ciudadcapital.net](http://ciudadcapital.net), [www.ciudadcapital.net](http://www.ciudadcapital.net) y [blog.ciudadcapital.net](http://blog.ciudadcapital.net) apuntarán a esta página.~
*   ~**[mud.ciudadcapital.net](telnet://mud.ciudadcapital.net)** es la dirección a utilizar para conectarte al mud. El puerto por defecto (23) está abierto a jugadores. El puerto 5000 es el servidor de desarrollo, abierto únicamente a programadores. El puerto 5000 está abierto a jugadores. El puerto 5010 es el servidor de desarrollo, abierto únicamente a programadores.
