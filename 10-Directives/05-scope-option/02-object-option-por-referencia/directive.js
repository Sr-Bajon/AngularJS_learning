angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData: '='
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange   = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
        $scope.changeStock = function () {
          $scope.stockData = {
            name    : 'Directive Stock',
            price   : 500,
            previous: 200
          };
        };
      }
    };
  }]);
// en la directiva a�adimos una funci�n similar que cambia el stock actual tb
