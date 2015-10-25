angular.module('stockMarketApp', [])
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData : '=',
        stockTitle: '@',
        whenSelect: '&'
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
        $scope.onSelect  = function () {
          $scope.whenSelect({
            stockName    : $scope.stockData.name,
            stockPrice   : $scope.stockData.price,
            stockPrevious: $scope.stockData.previous
          });
        };
      }
    };
  }]);

/*
  * La logica de renderizado está encapsulada dentro de stock.html, que se carga
    usando templateUrl
  * La directiva es de tipo atributo
  * El scope es de tipo objeto con stockData, stockTitle y la función whenSelect
  * La link function define una función para calcular el porcentaje de cambio
    asi como una funcion para la UI para llamar al boton clickado.
 */
