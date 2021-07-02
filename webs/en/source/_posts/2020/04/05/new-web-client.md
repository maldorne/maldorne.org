---
title: Nuevo cliente web
date: 2020-04-05 18:54:56
author: neverbot
tags:
categories:
 - Web
language: es
---

Hemos recuperado el antiguo cliente web que estaba disponible en la antigua web de _ciudadcapital.net_, está disponible en la página [**play**](/es/play), que podéis encontrar en la cabecera de la web.

_Algo de cháchara tecnológica:_

Hemos tardado en ponerla en funcionamiento, ya que ha sido necesario actualizar un par de proyectos ya antiguos que no funcionaban en páginas seguras (`https://`). Hemos dejado los proyectos a vuestra disposición en [github.com](https://github.com/houseofmaldorne/), por si alguien quiere echarles un vistazo, reaprovecharlos o sugerir alguna modificación:

* [`mud-web-client`](https://github.com/houseofmaldorne/mud-web-client) es el cliente web que podeis ver en nuestra web. Se conecta a través de websocket seguro (`wss://`) a un proxy intermedio entre el cliente y el mud telnet.
* [`mud-web-proxy`](https://github.com/houseofmaldorne/mud-web-proxy) es el proxy que se ejecuta en el servidor del mud, y realiza la _traducción_ entre `wss` y `telnet`.

Cualquier comentario será bienvenido, en los `issues` de github o a través del [twitter de House of Maldorne](https://twitter.com/houseofmaldorne).