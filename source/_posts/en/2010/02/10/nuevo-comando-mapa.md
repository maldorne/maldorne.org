title: 'Nuevo comando: mapa'
tags:
  - comandos
  - mapa
categories:
  - [Novedades]
url: 140.html
id: 140
date: 2010-02-10 18:43:22
author:
language: es
---
En cualquier lugar en el que te encuentres, construye un mapa de la zona y te lo muestra, como en el siguiente ejemplo (de la ciudad de _Sqargeld_):

```
> mapa

          ______________________________________________________________
         /\                                                             \
         \_|                                                             |
           |                                                             |
           |                  |                 |                        |
           |        ---[ ]---[ ]---[ ]---[ ]---[ ]---[ ]---[ ]---        |
           |                                    |                        |
           |                             [ ]   [ ]                       |
           |         \                 /        |                        |
           |           [ ]         [ ]         [P]                       |
           |            |        /     \        |                        |
           |        ---[ ]---[ ]         [*]---[ ]---[ ]---[P]---        |
           |            |        \     /        |                        |
           |           [ ]         [ ]         [P]                       |
           |            |        /     \        |                        |
           |        ---[ ]---[ ]         [ ]   [ ]                       |
           |                  |                 |                        |
           |        ---[ ]---[ ]---[P]---[ ]---[ ]---[P]---[ ]---        |
           |                  |                 |                        |
           |                                                             |
           |                             Leyenda:                        |
           |                                 * : Tu posición             |
           |                                 P : Puertas                 |
           |                                                             |
           |   __________________________________________________________|___
            \_/_____________________________________________________________/
> 
```

Te indica dónde hay puertas de entrada a otros lugares, escaleras de subida y de bajada, dónde puedes encontrar nuevas misiones y dónde te quedan misiones por entregar, etc. De hecho, la leyenda sólo muestra los símbolos que aparecen en tu mapa, para que sea lo más corto posible. Está en pruebas a ver que tal resultado va dando, ya me contaréis.

**Actualizado**: Ahora también muestra las zonas costeras donde puede comenzarse a nadar. El mapa no se puede utilizar en el interior de los _dungeons_.