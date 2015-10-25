/*
  ngRoute es un modulo opcional

  las rutas son declarativas, todas las rutas se definen en una seccion de la
  configuración donde especificamos que ruta es y que debe hacer AngularJS
  cuando se encuentra en esa ruta

  Las URL normales no son iguales que las de una SPA (single page application)
    http://www.myawesomeapp.com/first/page
  SPA
    http://www.myawesomeapp.com/#/first/page
    http://www.myawesomeapp.com/#!/first/page

  Cualquier fragmento de URL que vaya despues de # es ignorada por el navegador,
  cuando el usuario navega desde
    http://www.myawesomeapp.com/#/first/page
  a
    http://www.myawesomeapp.com/#/second/page
  El navegador no hace ninguna peticion y la pagina no se recarga.

  El modulo ngRoute antes formaba parte del core de Angular, pero ha sido
  separado porque hay muchas opciones para elegir, como ui-route por ejemplo.

  Para usarlo hay que incluir el script correspondiente:
    <script type="text/javascript" src="/path/to/angular-route.min.js"></script>
  E inyectar la dependencia en nuestro modulo
    angular.module("myApp", ["ngRoute"])
  Marcar que parte de la pagina cambiará cuando la ruta cambie, con el modulo
    ngRoute esto se hace con la directiva ng-view
  Las rutas se definen en la seccion config usando el servicio $routeProvider
*/
