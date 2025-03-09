---
title: 'Nueva funcionalidad: Enciclopedia dentro del juego'
tags:
  - enciclopedia
  - exploración
categories:
  - updates
  - capital city  
url: 156.html
id: 156
date: 2010-03-06 17:51:48
author:
language: es
---

Aprovechando la vuelta de la conectividad, hemos añadido una nueva funcionalidad bastante interesante, una **enciclopedia dentro del propio mundo de juego**. Ahora el diario que todos los jugadores llevan encima tiene nuevas opciones:

```
> mirar diario
Diario.

     Es un libro donde tomas notas sobre tus aventuras y viajes. Tiene una
  cuerda que sirve para cerrarlo y atarle un pequeño lápiz con el que escribir
  en sus arrugadas páginas. Escribe 'ayuda diario' para ver
  las distintas opciones.

> 
> ayuda diario
Puedes utilizar los siguientes comandos:
        diario explorador  - lista todos los lugares que has explorado.
        enciclopedia       - lista los artículos que has copiado en tu diario.
        enciclopedia <num> - lee un artículo de la enciclopedia.

> 
```

En diversas ocasiones obtendremos nueva información sobre el mundo de juego, como por ejemplo cada vez que leamos un libro (es necesario leer todas sus páginas). Os copio el texto casi entero para que veáis la diferencia entre leerlo de un libro o leerlo de la enciclopedia:

```
> leer libro
Abres el libro 'Historia de Dargaad':

  El reino de Dargaad controla la mayor parte de los territorios al noreste del
  continente, a ambos lados de la cordillera de las Montañas Nubladas. Su
  capital, Dargaad, es la ciudad más habitada en latitudes superiores al Bosque
  de Gödel, y confiere al reino una gran influencia política, social y
  económica, convirtiéndolo en uno de los más importantes del continente. 


         [Página 1 de 3, +/- (cambiar página), h (ayuda), q (salir)]         

> +
  Fronteras

       * Sur: Hacia el sur el reino de Dargaad crece desmesuradamente, sin
  tener una frontera clara. La anexión de los territorios controlados por la
  ciudad de Crepúsculo ha extendido sus influencias a través de las Colinas
  Umbrías y el Valle de las Nieblas Aulladoras y, aunque generalmente se toman
  como territorios de Dargaad, el extremo sur de las Estepas Nubladas suele
  permanecer deshabitado la mayor parte del año. 

[...]

         [Página 3 de 3, +/- (cambiar página), h (ayuda), q (salir)]         


> +
Cierras el libro.

        Nuevo artículo añadido a la enciclopedia: 'Historia de Dargaad'.

>
```
A partir de ese momento podremos consulta la enciclopedia y leer cada uno de los artículos. Como podéis ver, el texto ahora no estará dividido por páginas, sino que podrá leerse de un tirón.

```
> enciclopedia
Has escrito los siguientes artículos en tu enciclopedia:

        1) Historia de Dargaad

En total, has escrito un artículo.
> 
> enciclopedia 1
                              Historia de Dargaad                              

  El reino de Dargaad controla la mayor parte de los territorios al noreste del
  continente, a ambos lados de la cordillera de las Montañas Nubladas. Su
  capital, Dargaad, es la ciudad más habitada en latitudes superiores al Bosque
  de Gödel, y confiere al reino una gran influencia política, social y
  económica, convirtiéndolo en uno de los más importantes del continente. 

  Fronteras

       * Sur: Hacia el sur el reino de Dargaad crece desmesuradamente, sin
  tener una frontera clara. La anexión de los territorios controlados por la
  ciudad de Crepúsculo ha extendido sus influencias a través de las Colinas
  Umbrías y el Valle de las Nieblas Aulladoras y, aunque generalmente se toman
  como territorios de Dargaad, el extremo sur de las Estepas Nubladas suele
  permanecer deshabitado la mayor parte del año. 
[...]
```
Una gran diferencia es que, si comenzamos a aprender más sobre el mundo y escribir nuevos artículos en la enciclopedia, esta irá evolucionando, mostrando qué partes de las estamos leyendo tienen más información en otros artículos. Si, por ejemplo, de algún otro modo (sea un libro u otra cosa) aprendemos cosas sobre el pueblo de Crepúsculo, veremos:

```
> enciclopedia
Has escrito los siguientes artículos en tu enciclopedia:

        1) Historia de Dargaad
        2) El pueblo de Crepúsculo

En total, has escrito dos artículos.
> 
> enciclopedia 1
                              Historia de Dargaad                              

  El reino de Dargaad controla la mayor parte de los territorios al noreste del
  continente, a ambos lados de la cordillera de las Montañas Nubladas. Su
  capital, Dargaad, es la ciudad más habitada en latitudes superiores al Bosque
  de Gödel, y confiere al reino una gran influencia política, social y
  económica, convirtiéndolo en uno de los más importantes del continente. 

  Fronteras

       * Sur: Hacia el sur el reino de Dargaad crece desmesuradamente, sin
  tener una frontera clara. La anexión de los territorios controlados por la
  ciudad de Crepúsculo (2) ha extendido sus influencias a través de 
[...]
> 
> enciclopedia 2
                            El pueblo de Crepúsculo                            

  Crepúsculo es un pueblo perteneciente al reino de Dargaad
  (1), en su extremo sur, cerca de las estepas. Enclavado en un
  profundo valle conocido como Valle de las Nieblas Aulladoras, su especial
  situación geográfica y climatológica hace que las neblinas sean casi
  permanentes a lo largo de todo el año. 
> 
```

Los elementos sobre los que se tenga más información aparecerán **resaltados en negrita y subrayados**, junto con un número que indicará el número de artículo en el que podremos encontrar más información. De este modo, según un personaje vaya conociendo más cosas sobre el mundo, encontrando más libros o resolviendo más misiones, en su enciclopedia personal irán apareciendo progresivamente más artículos, donde podrá revisar cualquier elemento anterior fácilmente.
