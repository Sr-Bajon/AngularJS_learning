// File: tab.js
angular.module('stockMarketApp')
  .directive('tab', [function () {
    return {
      restrict  : 'E',
      transclude: true,
      template  : '<div ng-show="selected" ng-transclude></div>',
      require   : '^tabs',
      scope     : true,
      link      : function ($scope, $element, $attr, tabCtrl) {
        tabCtrl.registerTab($attr.title, $scope);
      }
    };
  }]);

/*
  * En este caso se usa ng-transclude en el template de la directiva para incluir
    el contenido dentro de un div, y añade una condicion para ocultar y mostrar
    selectivamente el div sobre una variable seleccionada del scope.
  * Añadimos una nueva clave, require, y se usa con el valor ^tabs
    Esto le dice a AngularJS que para que la directiva tab funcione, requiere
    que uno de los elementos padres en el HTML sea la directiva tabs, y queremos
    que su controlador esté disponible en esta directiva.
  * Definimos un nuevo scope para esta directiva asi que las variables locales
    no sobreescriban nada del scope del padre.
  * En la funcion link, pasamos el controlaodr requerido como cuarto argumento,
    despues de scope, element y attributes. Esto es una instancia del
    controlador que hemos definido en la directiva tabs, y es inyectado
    dinamicamente por Angular basado en lo que encuentre.
  * Dentro de la funcion link, registramos la pestaña con la funcion de la
    directiva tabs que definimos anteriormente.
 */

/*
  La aplicación funciona asi:
  1)  Cuando la directiva tabs es encontrada en el HTML, el contenido es
      transcluded y un espacio para tabs es preservada en el HTML (usando
      ng-repeat).
      El tabs actual es insertada debajo de el.
  2)  Cada tab individual se registra con su padre, asi que el controlador de
      tabs puede decidir que tab es actualmente seleccionado y remarcar y
      ocultar o mostrar otros tabs cuando se necesite.
  3)  Cada tab a su vez usa transclusion sobre su contenido para almacenarlo en
      un contenedor que puede ser mostrado y ocultado a necesidad.
  4)  Sobre el registro, el controlador tabs toma la primera tabs como
      seleccionada (usando una variable del scope pasada al controlador de tabs)
  5)  Despues de eso, ng-click maneja ocultar y mostrar los tabs individuales
      usando las funciones definidas en el scope y la directiva tabs.
 */
