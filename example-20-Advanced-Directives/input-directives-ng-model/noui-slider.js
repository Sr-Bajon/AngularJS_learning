angular.module('sliderApp')
  .directive('noUiSlider', [function () {
    return {
      restrict: 'E',
      require : 'ngModel',
      link    : function ($scope, $element, $attr, ngModelCtrl) {
        // noUiSlider es la función de jQuery para crear el widget
        $element.noUiSlider({
          // We might not have the initial value in ngModelCtrl yet
          start: 0,
          range: {
            // $attrs by default gives us string values
            // nouiSlider expects numbers, so convert
            min: Number($attr.rangeMin),
            max: Number($attr.rangeMax)
          }
        });

        // When data changes inside AngularJS
        // Notify the third party directive of the change
        ngModelCtrl.$render = function () {
          $element.val(ngModelCtrl.$viewValue);
        };

        // When data changes outside of AngularJS
        $element.on('set', function (args) {
          // Also tell AngularJS that it needs to update the UI
          $scope.$apply(function () {
            // Set the data within AngularJS
            ngModelCtrl.$setViewValue($element.val());
          });
        });
      }
    };
  }]);

/*
  1.  Creamos una directiva de tipo elemento, que requiere que la directiva
      ng-model se use en el mismo elemento que la directiva noUiSlider que
      estamos creando.
  2.  En la funcion link, primero creamos el noUiSlider llamando a su
      constructor con los parametros adecuados, usamos los atributos del html
      convirtiendolos a Number que es lo que espera el widget
  3.  Porque noUiSlider es un plugin de jQuery, y cargamos jQuery antes de
      cargar Angular en index.html, llamamos directamente a la función
      noUiSlider sobre nuestro elemento, porque jQuery se integra dentro de
      AngularJS.
  4.  Despues, para acabar de integrar ngModel dentro del input del third-party
      necesitamos hacer dos cosas:
      a.  Cuando los datos cambien dentro de AngularJS, necesitamos actualizar
          el componente third-party. Hacemos esto sobreescribiendo el metodo
          $render en el ngModelCtrl y estableciendo el valor del componete
          third-party dentro de él.
          El ultimo y mayor valor establecido actualmente en la variable
          referida por ngModel esta disponible en ngModelCtrl en la variable
          $viewValue.
          AngularJS llama al metodo $render cuando el valor del modelo cambie
          dentro de AngularJS (por ejemplo, cuando es inicializado a un valor
          en nuestro controlador)
      b.  Cuando los datos cambian fuera de AngularJS, necesitamos actualizar
          Angular con el nuevo valor. Hacemos esto llamando a la funcion
          $setViewValue de ngModelCtrl con el ultimo y mayor valor dentro de
          set listener.
  5.  Tambien, como es mencionado en el ciclo de vida de AngularJS, AngularJS
      actualiza la UI cuando sabe que cosas dentro de su control han cambiado.
      Un componente third-party esta fuera del ciclo de vida de AngularJS, asi
      que necesitamos llamar manualmente a $scope.$apply() para asegurarnos
      que AngularJS actualiza la UI.
      La llamada a $scope.$apply() toma una función opcional como argumento y
      se asegura que el digest cycle de AngularJS se responsabiliza de
      actualizar la UI con los ultimos valores.
 */

/*
  Cuando integramos un componente third-party que necesite actuar como un widget
  de tipo input, siempre tiene sentido integrarlo en la directiva ngModel para
  que funciones de forma parecida a cualquier otro input widget.
  Al hacer esto, debemos tener cuidado del two-way data-binding:

  * Cuando los datos dentro de AngularJS cambian, necesitamos actualizar el
    componente third-party con los ultimos datos, sobreescribiendo la función
    ngModelCtrl.$render
  * Cuando los datos fuera de AngularJS cambien, necesitamos capturar y
    actualizar el model de Angular, llamando a ngModelCtrl.$setViewValue con
    el valor actualizado.

  Como los unicos escuchadores que añadimos estan en el elemento, cuando el
  elemento es destruido, estos escuchadores son borrados. Si añadimos otro
  escuchador, entonces somos responsables de limpiarlos también.
 */
