/*
  Como segundo argumento $routeProvider toma un objeto de configuracíon que
  puede tener varias claves.
*/
  $routeProvider.when(url, {
    template: string,
    templateUrl: string,
    controller: string, function or array,
    controllerAs: string,
    resolve: object<key, function>
  });

/*
  url
    Es el primer parametro del $routeProvider.when
    Admite una expresión regular
    Permite variables en la URL
      /list
      /recipe/:recipeId

  template
    Si el HTML no es muy largo, podemos directamente introducir un string que
    contenga el html a insertar.

  templateUrl
    Podemos especificar la ruta del partial aqui, que será pedida al servidor.
    Futuras peticiones serán cacheadas para que sean mas rapidas.

    $routeProvider.when('/test', {
      templateUrl: 'views/test.html',
    });

  controller
    Hay dos formas de definir el controlador para una ruta particular.
    Se trata de un argumento opcional en caso de que no hayamos definido un
    ng-controller en el html de la ruta.

    Si el controlador ya ha sido declarado usando
      angularApp.controller("MyCtrl")
    podemos especificar el nombre del controlador como un string.
    Podemos tambien agregar un alias en la clave, tal como "MyCtrl as ctrl"

    La otra opcion es definir el controlador inline, en cuyo caso pasamos la
    funcion del controller directamente en la clave controller.
    En este caso podemos usar la sintaxis de array para inyectar nuestras
    dependencias de modo seguro ante la minificacion.
*/
    $routeProvider.when('/test', {
      template: '<h1>Test Route</h1>',
      controller: ['$window', function($window) {
        $window.alert('Test route has been loaded!');
      }]
    });
/*
  controllerAs
    permite definir un alias, util en caso de definir el controlador inline
    Los dos ejemplos siguientes son equivalentes.
*/
    $routeProvider.when('/test', {
      template: '<h1>Test Route</h1>',
      controller: 'MyCtrl as ctrl'
    });

    $routeProvider.when('/test', {
      template: '<h1>Test Route</h1>',
      controller: 'MyCtrl',
      controllerAs: 'ctrl'
    });
/*
  redirectTo
    Hay casos en que URL que existian antes dejan de hacerlo o varias rutas que
    van a la misma pagina, para eso existe esta clave.
    En el ejemplo se iria a /new cuando el usuario vaya a /#/new o a /#/old
*/
      $routeProvider.when('/new', {
        template: '<h1>New Route</h1>'
      });
      $routeProvider.when('/old', {
        redirectTo: '/new'
      });
/*
  resolve
    Es una forma de ejecutar y finalizar tareas asincronas antes de que una ruta
    sea cargada. Es una gran forma de asegurarse de que el usuario está logeado
    y tiene autorizacion o permisos, e incluso pre-cargar algunos datos antes de
    que el controlador y la ruta se carguen dentro de la vista.
 */
