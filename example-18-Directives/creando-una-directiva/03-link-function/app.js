/*
  Link Function:
    La palabra reservada link de la definicion de la directiva se usa para
    crear una link function en la directiva.

    La link function hace para la directiva lo que el controlador hace por la
    vista, define los APIs y funciones necesarios para esa directiva.

    AngularJS ejecuta la función link por cada instancia de la directiva asi que
    cada directiva tiene sus propio ambito y no se verá afectada por el uso de
    otras instancias de la misma directiva.

      link: function($scope, $element, $attrs) {}

    A la funcion link se le pasa el $scope del elemento en el que esta
    trabajando la directiva, el HTML DOM del elemento y todos los atributos
    del elemento como strings. Si queremos añadir funcionalidad podemos añadirlo
    al $scope del elemento.

    Siguiendo el ejemplo, moveremos la funcionalidad de mainCtrl a nuestra
    directiva.
 */
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'AE',
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
      }
    };
  }]);
