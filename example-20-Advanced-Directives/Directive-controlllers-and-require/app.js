/*
  Hasta ahora, hemos visto que en la link function de las directivas podemos
  añadir la funcionalidad y logica de negocio a nuestras directivas, pero las
  directivas tambien pueden tener controladores.

  Los controladores de las directivas se usan para la comunicacion
  inter-directiva, ya sea para compartir su estado, variables o incluso
  funciones emtre directivas.

  En este ejemplo vamos a crear una directivas de pestañas, pero usaremos
  un controlador de directiva para cada pestaña.
 */

angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var mainCtrl         = this;
    mainCtrl.startedTime = new Date().getTime();
    mainCtrl.stocks      = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];
  }]);

