---
title: Actualizaciones Verano 2020
language: es
date: 2020-08-01 01:35:12
author:
tags:
categories:
  - [Novedades]
---

Cambios y actualizaciones de librerías para la versión **v20.07 Anduin**:

### Actualizaciones para jugadores

  * Arreglado el comando `password` para cambiar la contraseña del usuario.

### Actualizaciones para desarrolladores

  * Sistema de integración continua con el [repositorio de github](https://github.com/houseofmaldorne/hexagon):
    * Cada vez que se haga push de código a la rama master, se desplegará Hexagon de nuevo en el servidor de hosting.
    * El driver se recompila con cada despliegue.
  * Actualizada la versión usada de DGD a [1.6.13](https://github.com/dworkin/dgd/tree/1.6.13).
  * Replicada la documentación de `/docs/` para cada idioma.
  * Incluída la documentación actualizada del driver dentro del directorio `/docs/<lang>/driver` en cada deploy.
