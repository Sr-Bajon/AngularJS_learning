/*
  La otra cosa a tener en cuenta con las rutas, es el contexto de las mismas,
  por ejemplo, podemos querer mostrar el hilo de un email o los detalles de
  una receta y que se muestre en la URL para que el usuario pueda añadirla
  a favoritos o compartir la URL.
  En estos casos el controlador debe observar la URL y con la información
  obtenida realizar las peticiones precisas al servidor para recabar informacion.

  Los parametros de la URL pueden ser accedidos a traves de un servicio llamado
  $routeParams
 */

angular.module('resolveApp', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<h1>Main Page</h1>'
      })
      .when('/detail/:detId', {
        // esa ruta le dice a Angular que despues de detail/ hay un valor que
        // debe ser almacenado y suministrado al controlador con el nombre detId
        template    : '<h2>Loaded {{myCtrl.detailId}}' +
                      ' and query String is {{myCtrl.qStr}}</h2>',
        controller  : ['$routeParams', function ($routeParams) {
          // para poder recuperar los valores de la URL debemos inyectar
          // $routeParams
          this.detailId = $routeParams.detId;
          // q se obtendría de una url de tipo
          //        /detail/123?q=MySearchParam
          // donde detId sería 123 y q sería MySearchParam
          this.qStr     = $routeParams.q;
        }],
        controllerAs: 'myCtrl'
      });
  }]);

/*
  Algunas cosas que no están bien documentadas:

  Empty Templates
    AngularJS requiere que cada ruta esté asociada a un template o templateURL
    que no esté vacío, en caso contrarío ignorará esa ruta. Un string vacío
    tampoco sirve.

  Resolve injection into controller
    Si usamos resolve y queremos que se inyecten los valores de nuestras
    dependencias en el controlador, hay que definir nuestro controlador como
    parte de la definición de la ruta, y no directamente en nuestro controlador
    con la directiva ng-controller. De otra forma, AngularJS no sabrá que
    controlador necesita esas dependencias, y no las podrá inyectar
    apropiadamente.

  $routeParam variable type
    Un problema potencial al usar el servicio $routeParams es cuando comparamos
    los valores que obtenemos de $routeParams con los objetos de nuestra base de
    datos.
    Por ejemplo, si almacenamos IDs como numeros en nuestra base de datos y lo
    comparamos con nuestros datos de $routeParams, debemos tener cuidado pues
    $routeParams devuelve string para todos los datos por lo que una comparación
    === con algo que no sea un numero fallará, así que habrá que hacer la
    conversión precisa.

  One ng-view per application
    Por cada aplicacion AngularJS que use ngRoute, puede haber una y solo una
    directiva ng-view. No podemos tener multiples ng-views anidadadas.
    El contenido se duplicará en cada ng-view en caso de que tengamos mas de uno
 */
