/*
  Las directivas tienen un concepto llamado transclusion que nos permite crear
  directivas reusables donde cada implementación puede necesitar renderizar
  una cierta seccion de la UI diferente.
 */

angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
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
