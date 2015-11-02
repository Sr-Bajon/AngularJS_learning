// directive.js
angular.module('stockMarketApp')
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
// scope tiene ahora dos atributos mas, stockTitle de tipo @, por lo que se pasa
// como string y queda bindeado con Angular.
// tb hemos añadido a scope whenSelect de tipo &, lo que permite ejecutar la
// funcion cuando queramos.
// finalmente se añade la función onSelect en la link function, para cuando el
// user haga click en el boton

/*
  nos surge el problema de que la función que se ha pasado tiene tres
  parametros que deben ser satisfechos, si no proporcionamos alguno la funcion
  falla, esto hace podo reusable nuestra directiva pues la función se podría
  implementar de varias formas. Para solventar esto:
   * Cada directiva al ejecutar la función puede definir varios parametros que
     estan disponibles en el controlador
   * Cada controlador puede entonces dedicir cual de estos parametros usa
   * El controlador puede decidir el orden y numero de parametros que quiere
     de la directiva.

  De esta forma, el controlador puede pedir lo que quiera, en el orden que .
  quiera
  La directiva puede conseguir esto pasando un objeto a la función que se le ha
  pasado. En este objeto, cada clave dicta un parametro que el contrador pide,
  y el valor asignado a esa clave es el valor que el controlador recibe cuando
  pregunta por una clave particular.
  En el ejemplo previo, la función whenSelect se llama con un objeto con tres
  claves:
    stockName
    stockPrice
    stockPrevious
  Y sus valores corresponden a los valores individuales de stock. Nuestro
  controlador decide entonces que solo se preocupa de stockPrice y stockName,
  en ese orden, especificandolo en el HTML en ese orden, con esas claves.
  AngularJS entonces inyectará esos valores en el orden que el controlador ha
  pedido. Nuestro controlador decide ignorar stockPrevious, mientras otro
  controlador puede pedir stockPrevious e ignorar el resto.

  Podemos entonces definir un set de parametros que cada controlador puede pedir
  como parte de la funcion que se le pasa a la directiva.
*/
