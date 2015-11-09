angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var mainCtrl           = this;
    mainCtrl.stocks        = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];
    mainCtrl.stockTemplate = 'stock.html';
    mainCtrl.getChange     = function (stock) {
      return Math.ceil((
        (stock.price - stock.previous) / stock.previous) * 100);
    };
  }]);

/*
*   Siempre que queramos servir un partial, debemos hacerlo desde servidor ya
*   que el navegador no permite pedir archivos con el protocolo file://
*   De forma simple podemos añadir un servidor con el modulo htt-server
*
*     sudo npm install -g http-server
*
*   y despues ejecutarlo en el directorio en el que esté index.html
*
*     http-server
*
*   Webstorm tambien crea un servidor si ejecutamos index.html con él.
* */
