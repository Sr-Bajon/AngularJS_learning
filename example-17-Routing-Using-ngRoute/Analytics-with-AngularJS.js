/*
  Los analizadores tradicionales, como Google Analytics no funcionan facilmente
  con las paginas SPA, porque añaden un evento de analisis en cada carga de
  pagina.
  En el caso de SPA debemos lanzar manualmente el analizador y decirle a
  Google Analytics que la ruta ha cambiado ademas de otros eventos.

  AngularJS ha intentado varias aproximaciones a esto, y una de las opciones
  mas comunes es Angularytics, que provee un servicio para manualmente capturar
  eventos.

  https://github.com/mgonto/angularytics


  por supuesto tenemos que incluir angular.js y angularytics.js en el html
 */

angular.module('myTrackingApp', ['angularytics'])
  .config(['AngularyticsProvider',
    function (AngularyticsProvider) {
      AngularyticsProvider.setEventHandlers(
        ['GoogleUniversal', 'Console']);
    }]).run(['Angularytics', function (Angularytics) {
    Angularytics.init();
  }]);

/*
  Despues de esto, debemos usar atributos en el html para registrar los eventos

  <button ng-click="myCtrl.login() | trackEvent:'Login Page':'clicked login'">
    Login
  </button>

  Y tambien podemos usarlo en los servicios y controladores
    Angularytics.trackEvent('Create Page', 'Opened');
 */
