/*
  Basic transclusion:

  Puede ser pensada como un proceso de dos pasos:

  1.  Primero, le decimos a la directiva que vamos a usar transclusion como
      parte de la directiva. Esto le dice a AngularJS que donde quiera que
      encuentre la directiva en el HTML, para hacer una copia de su contenido
      y almacenarla para que no se pierda cuando AngularJS la reemplace con el
      contenido de la directiva.
      Esto se hace poniendo la clave transclude a true en el objeto de
      definicion de la directiva.
  2.  Segundo, necesitamos decirle a AngularJS donde poner el contenido que ha
      sido almacenado en el template. Esto se hace usando la directiva
      ng-transclude, que hace que el elemento capturado sea hijo del elemento
      donde se encuentra la directiva.
 */
// File: directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      transclude : true,
      scope      : {
        stockData: '='
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
      }
    };
  }]);

/*
  ¿Como funciona el transcule y el codigo a transcludear tiene a su vez bindeos
  de Angular?
  Angular mantiene el trozo de codigo transcluded con el scope del elemento
  padre, por eso puede acceder a bindeos que se hayan hecho en el HTML contenido
  en la directiva y no en el scope propio de la directiva, aunque este sea
  isolated (de tipo objeto)
 */
