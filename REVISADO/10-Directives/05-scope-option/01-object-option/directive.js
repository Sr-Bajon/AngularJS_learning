angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData: '='
        // AngularJS crea una variable llamada stockData
        // En el HTML, el valor de stockData se puede setear usando el atributo
        //  stock-data
        // El valor de stockData se ata al objeto al que el atributo HTML
        // stock-data apunta, cualquier cambio en el valor se refleja
        // inmediatamente en el scope de la directiva
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
      }
    };
  }]);
