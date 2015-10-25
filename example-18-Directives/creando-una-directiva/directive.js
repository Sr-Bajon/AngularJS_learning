angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html'
    };
  }]);
// la definicion de la directiva es muy simple, simplemente declaramos que cada
// vez que encuentre la directiva stock-widget en el html lo sustituya por el
// contenido del archivo html, stock.html

// otra cosa a tener en cuenta es que stock.html se cacheará despues del primer
// uso y los subsiguientes harán uso de la caché
