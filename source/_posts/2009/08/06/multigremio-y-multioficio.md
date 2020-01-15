title: Multigremio y multioficio
tags:
  - ajustar
  - clases
  - ficha
  - gremios
  - oficios
categories:
  - Personajes
url: 29.html
id: 29
date: 2009-08-06 15:04:28
author:
---
En Ciudad Capital, los únicos conceptos fijos durante toda la vida del personaje son los de la raza y clase:

*   La **raza** parece obvio que es un valor estable durante toda la vida del personaje. Aunque hay algunos conceptos a los que estamos dando vueltas para poder introducir algunas modificaciones, todavía están muy verdes, por lo que asumiremos que permanecerá siempre inalterable.
*   La **clase** define la forma de ser y enfrentarse al mundo del personaje. Estas clases son conceptos básicos, como Guerrero, Explorador, etc.

En el momento de creación del personaje sólo es necesario realizar tres pasos: **elección de raza** (y/o subraza o cultura en el caso de existir), **elección de clase** y [ajuste de las características](http://www.ciudadcapital.net/archivo/nuevo-metodo-para-ajustar-ficha/) (comúnmente conocida como "la ficha"). Sin embargo, con los nuevos conceptos de gremio y oficio, hemos introducido la capacidad para poder alistarse y abandonarlos cuando buenamente se quiera, proporcionando así una mayor vida útil al personaje, y dejando de lado en la mayor parte de los casos la necesidad de volver a crear múltiples personajes para probar el juego. Así, tras alistarse en un gremio y avanzar varios niveles dentro de ese gremio, el jugador puede abandonarlo. Mantendrá las dotes que haya aprendido (aunque podrían funcionar distinto cuando no se es miembro, si eso tiene lógica) y, lo más importante, quedará almacenado el nivel que se tenía en ese momento por si en un futuro el jugador desea volver al gremio original. Con el comando `ficha` únicamente se ve el gremio y oficio actuales, pero utilizando `who <mi nombre>` puede verse el histórico completo de gremios y oficios a los que se ha pertenecido. Por ejemplo:

```
> who folken

Folken el velan:
   Clase:
      Guerrero de nivel 8.
   Gremios:
      Caballero Astral de nivel 2.
      Templario Negro de nivel 1.
   Oficios:
      Cazador de nivel 1.
```