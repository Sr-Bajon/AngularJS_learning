// File: chapter10/routing-example/app/scripts/controllers.js
angular.module('fifaApp')
  .controller('MainCtrl', ['UserService',
    function (UserService) {
      var mainCtrl         = this;
      mainCtrl.userService = UserService;
      // expone UserService a la vista para que se pueda mostrar y ocultar el
      // enlace de login y logout
      // tambien hace una llamada al servidor al cargar la aplicación para ver
      // si el usuario está logado
      UserService.session();
    }])

  .controller('TeamListCtrl', ['FifaService',
    function (FifaService) {
      var teamListCtrl   = this;
      teamListCtrl.teams = [];

      FifaService
        .getTeams()
        .then(function (resp) {
          teamListCtrl.teams = resp.data;
        });
    }])

  .controller('LoginCtrl', ['UserService', '$location',
    function (UserService, $location) {
      var loginCtrl  = this;
      loginCtrl.user = {username: '', password: ''};

      loginCtrl.login = function () {
        UserService
          .login(loginCtrl.user)
          .then(function (success) {
            // si se loguea se redirige a la pagina de inicio
            $location.path('/');
          }, function (error) {
            loginCtrl.errorMessage = error.data.msg;
          })
      };
    }])

  .controller('TeamDetailsCtrl',
  ['$location', '$routeParams', 'FifaService',
    function ($location, $routeParams, FifaService) {
      var teamDetailsCtrl  = this;
      teamDetailsCtrl.team = {};
      FifaService
        .getTeamDetails($routeParams.code)
        .then(function (resp) {
          teamDetailsCtrl.team = resp.data;
        }, function (error) {
          $location.path('/login');
        });
    }]);
