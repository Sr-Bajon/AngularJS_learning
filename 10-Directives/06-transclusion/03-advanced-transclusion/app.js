/*
  Advanced transclusion

  Otro caso comun es tener multiples copias del template hecho y usarlas cuando
  se necesiten. Por ejemplo, en vez de mostrar el contenido de nuesta directiva
  una vez, podriamos querer mostrarlo multiples veces dentro de un carrusel.

  Esto tambien ocurre con la directiva ng-repeat, donde definimos un template
  que queremos que se repita, y luego por cada instancia creamos el template
  y lo insertamos dinamicamente.

  Haremos una copia con menos funcionalidad de ng-repeat para ilustrar este
  tipo de transclude.
 */

// File: app.js
angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var self    = this;
    self.stocks = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];
  }]);
