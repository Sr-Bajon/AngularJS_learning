/*
  http://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html
  http://googlewebmastercentral.blogspot.com.es/2014/05/rendering-pages-with-fetch-as-google.html

  * normalmente los buscadores y sus arañas esperan en paginas tipo SPA
    hasbang #! en vez de hast URL (#! en vez de #)
  * cuando las arañas buscan, reemplazan el #! con
      ?escaped_fragment=
    y la peticion se hace al servidor en vez de al cliente.
  * En este punto, para asegurarnos que el buscador obtiene el HTML correcto
    en vez de {{ }} debemos asegurarnos que el servidor reconoce estas URLs
    provenientes del buscador y las sabe manejar de forma diferente a las
    normales. Nos encontramos con dos opciones:
    1) Crear una captura HTML de la aplicación, y servir esos HTML cuando
       el crawler haga la peticion, esto es lo mas rapido pero debemos
       asegurarnos de mantener nuestro HTML snapshot actualizado. La
       documentacion de AngularJS por ejemplo, usa esta tecnica.
    2) Serve live, servir HTML renderizado cuando el crawler haga la peticion.
       Esto se puede hacer por ejemplo con PhantomJS, un navegador sin pantalla.
       Cuando el servidor reciba una peticion de un crawler, se le pide a
       PhantomJS que renderize la pagina apropiada y la devuelva para que la vea
       el crawler.

    Algunos enlaces utiles:
      http://getseojs.com/
      https://prerender.io/
      http://www.brombone.com/
      https://github.com/steeve/angular-seo
      http://www.yearofmoo.com/2012/11/angularjs-and-seo.html
      http://www.yearofmoo.com/
 */
