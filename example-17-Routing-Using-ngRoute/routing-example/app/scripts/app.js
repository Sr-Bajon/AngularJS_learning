// File: chapter10/routing-example/app/scripts/app.js
angular.module('fifaApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/team_list.html',
        controller : 'TeamListCtrl as teamListCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
        // en este caso el controlador esta especificado en el html
      })
      .when('/team/:code', {
        templateUrl: 'views/team_details.html',
        controller : 'TeamDetailsCtrl as teamDetailsCtrl',
        resolve    : {
          auth: ['$q', '$location', 'UserService',
            function ($q, $location, UserService) {
              return UserService.session().then(
                function (success) {
                },
                function (err) {
                  $location.path('/login');
                  // $location.replace() hace que la pagina no entre en el
                  // historial
                  $location.replace();
                  // si no hacemos un $q.reject Angular lo trata como que hemos
                  // manejado correctamente el error
                  return $q.reject(err);
                });
            }]
        }
        // no queda resuelto el tema de que la sesion expire mientras el usuario
        // se encuentra en la pagina, para lo que deberiamos usar
        // HTTP interceptors. Los resolves son buenos para chequeos pre-route
        // pero no para chequear que ocurre cuando el usuario llega a la pagina
      });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });
