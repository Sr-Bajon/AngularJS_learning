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
