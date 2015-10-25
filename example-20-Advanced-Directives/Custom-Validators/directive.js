angular.module('stockMarketApp')
  .directive('validZip', [function () {
    var zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/g;
    return {
      restrict: 'A',
      require : 'ngModel',
      link    : function ($scope, $element, $attrs, ngModelCtrl) {
        // Handle DOM update --> Model update
        ngModelCtrl.$parsers.unshift(function (value) {
          var valid = zipCodeRegex.test(value);
          ngModelCtrl.$setValidity('validZip', valid);
          return valid ? value : undefined;
        });
        // Handle Model Update --> DOM
        ngModelCtrl.$formatters.unshift(function (value) {
          ngModelCtrl.$setValidity('validZip',
            zipCodeRegex.test(value));
          return value;
        });
      }
    };
  }]);


/*
  Cuando los datos cambian en el DOM, AngularJS pasa por cada parser, y el
  parser chequea la validez de los datos antes de pasarlos a lo largo de la
  cadena.
  Nosotros añadimos nuestro propio parser o cadena de parsers, y añadimos
  nuestro validador usando expresiones regulars.

  En cualquier caso, seteamos la validez de nuestra directiva en el controlador
  de ngModel.

  La funcion parser debe devolver el valor correcto o undefined en el caso de
  que no haya datos.

  Necesitamos tambien manejar el caso donde el modelo es actualizado, por
  ejemplo cuando se obtiene respuesta del servidor. En este caso, AngularJS
  pasa los datos a traves de un paso de formateo para asegurarse que esta
  tomando la API correcta. Vuelve a validarlo aqui y retorna el valor.

  En ambos casos, seteamos la validez del elemento usando el nombre de la
  directiva en el controlador de ngModel.

  Ahora, podriamos muy bien hacer una validación asincrona en alguno de estos
  casos haciendo una llamada al servidor a traves de $http. Por ejemplo, la
  disponibilidad de email o username podría hacerse con estos validadores.

 */
