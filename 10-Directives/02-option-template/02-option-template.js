// si nuestro template es suficientemente pequeño podemos optar por la opcion
// de crearlo inline con la opcion template de la directiva.
// la declaracion de directiva siguiente es exactamente igual que la anterior
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      template: '<div class="stock-dash">' +
      'Name: ' +
      '<span class="stock-name"' +
        'ng-bind="stock.name">' +
      '</span>' +
      'Price: ' +
      '<span class="stock-price"' +
        'ng-bind="stock.price | currency">' +
      '</span>' +
      'Change: ' +
      '<span class="stock-change"' +
        'ng-bind="mainCtrl.getChange(stock) + ' % '">' +
      '</span>' +
      '</div>'
    };
  }]);
