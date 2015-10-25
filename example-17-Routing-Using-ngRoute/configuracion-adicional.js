/*
  Es posible crear aplicaciones SPA sin el hashtag #
  Se hace usando algo llamado HTML5 mode y el API pushState del navegador.
  De esta forma, AngularJS captura todos los cambios en la URL y los maneja
  sin causar una recarga de la pagina.

  Para activar el modeo HTML5 se necesita soporte de servidor. Mientras Angular
  puede manejar la carga inicial de index.html, y manejar todas las URLs
  subsequentes a la carga de la pagina, el servidor necesita estar avisado
  de que URLs soporta Angular, y que URLs deben ser respondidas por el servidor.

  Asumamos que tenemos una aplicacion con dos URLs
    /first/page
    /second/page
  Si navegamos a
    http://www.myaswesomeapp.com/first/page
  asumiendo que el modo HTML5 esta activado, el navegador hará una peticion al
  servidor. AngularJS no está cargado en este punto para que pueda manejar la
  URL del navegador. Por lo que es imperativo que el servidor recibla la
  peticion y devuelva el index.html que sería el mismo que si visitaramos
    http://www.myawesomeapp.com
  Despues de ello, Angular se encargaría de la parte
    /first/page
  cargando la parte correspondiente de la pagina.


  Para activar el modo HTML5 hacen falta 3 cosas:

  1) Activarlo en el config de la aplicacion
 */
angular.module('myHtml5App', ['ngRoute'])
  .config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);

      //Optional, se usa para SEO lo siguiente
      $locationProvider.hashPrefix('!');

      // A partir de aqui, la configuracion de rutas normal
      // Route for /first/page
      // Route for /second/page
    }]);
/*
  2) En nuestro archivo index.html debemos añadir el tag <base> con un atributo
     href en el head de la pagina.
     Esto es para decirle al navegador donde, en relacion a la URL, los recursos
     estaticos son servidos, asi que si la aplicacion pide una imagen o CSS
     con una ruta relativa, no se toma de la ruta actual necesariamente.

     Por ejemplo, digamos que nuestra aplicacion es servida desde
      http://www.mywebsite.com/app
     y tiene el modo HTML5 activado, asi que cuando el usuario navega a
      http://www.mywebsite.com/app/route/15, nuestro servidor sirve la pagina
      index.html pero para el navegador, la ruta es
        /app/route/15
      asi que todas las rutas relativas lo son a esta.


      <html>
        <head>
          <base href="/app" />
        </head>
      </html>


      Esto hace que todas las rutas relativas se resuelvan respecto a /app


  3) En el lado del servidor, necesitamos una regla para que cuando el servidor
     vea una peticion de /first/page  o  /sencond/page  sirva el contenido que
     normalmente sería para  /   que normalmente es index.html.
     En NodeJS, sería algo asi:
 */
var express = require('express'),
    url     = require('url');
var app     = express();

// express configuration here

var INDEX_HTML      = fs.readFileSync(
  __dirname + '/index.html', 'utf-8');

var ACCEPTABLE_URLS = ['/first/page', '/second/page'];

app.use(function (req, res, next) {
  var parts = url.parse(req.url);
  for (var i = 0; i < ACCEPTABLE_URLS.length; i++) {
    if (parts.pathname.indexOf(ACCEPTABLE_URLS[i]) === 0) {
      // We found a match to one of our
      // client-side routes
      return res.send(200, INDEX_HTML);
    }
  }
  return next();
});

// Other routes here
