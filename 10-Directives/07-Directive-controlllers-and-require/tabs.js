// File: tabs.js
angular.module('stockMarketApp')
  .directive('tabs', [function () {
    return {
      restrict  : 'E',
      transclude: true,
      scope     : true,
      template  : '<div class="tab-headers">' +
      ' <div ng-repeat="tab in tabs"' +
      '      ng-click="selectTab($index)"' +
      '      ng-class="{selected: isSelectedTab($index)}" > ' +
      '    <span ng-bind="tab.title" > </span> ' +
      '   </div>' +
      '</div>' +
      '<div ng-transclude></div> ',
      controller: function ($scope) {
        var currentIndex     = 0;
        $scope.tabs          = [];
        this.registerTab     = function (title, scope) {
          scope.selected = $scope.tabs.length === 0;
          $scope.tabs.push({title: title, scope: scope});
        };
        $scope.selectTab     = function (index) {
          currentIndex = index;
          for (var i = 0; i < $scope.tabs.length; i++) {
            $scope.tabs[i].scope.selected = currentIndex === i;
          }
        };
        $scope.isSelectedTab = function (index) {
          return currentIndex === index;
        };
      }
    };
  }]);

/*
  * La directiva usa transclusion para coger los tabs individuales y añadir
    los titulos encima de cada pestaña
  * La directiva tabs tambien define su propio scope, porque necesita añdir
    ciertas funciones al scope, y no queremos que colisione o sobreescriba
    ninguna propiedad o funciones del padre.
  * El template de la directiva define una seccion para repetir sobre los tabs
    individuales y mostrarlas. El template tambien maneja el click en un tab
    individual así como remarcar el tab seleccionado usando funciones sobre el
    scope de la directiva.
  * El template de la directiva tabs define un div en el template donde el
    contenido es transcluded usando ng-transclude. Aqui es donde el contenido
    completo de la directiva tab de index.html es incluido.
  * A continuación, en vez de definir una función link, definimos un controlador
    de directiva. La razon para hacer esto es porque queremos que las directivas
    hijas de la directiva tabs accedan a cierta funcionalidad de su directiva
    padre (la directiva tabs).
    Cuando necesitemos que se comunique el padre con sus hijos, o incluso entre
    directivas hermanas, debemos usar directive controllers.
  * Una directive controller es una funcion que toma el scope del elemento y lo
    inyecta. Es similar a la funcion link que hemos visto, pero la diferencia
    es que las funciones que definamos en el controlador sobre "this" serán
    accesibles por los hijos o controladores hermanos.
    Por lo tanto, el controlador puede definir funciones que son especificas
    de la instancia de la directiva definiendolas sobre el $scope, y definir
    la API o funciones accesibles y variables definiendolas sobre "this" o la
    instancia del controlador.
  * En este caso, definimos la variable tabs en el scope, asi como selectTab e
    isSelected, que son usadas por el template de la directiva para seleccionar
    tabs y remarcar el tab seleccionado.
    Ambas funciones set y unset la variable seleccionada del scope de un tab
    individual para manejar mostrar y ocultar tabs.
  * Tambien definimos una funcion lamada registerTab en la instancia del
    controlador, esta funcion, como no esta definida sobre el scope, no será
    accesibe desde el HTML de la directiva. Esta función añade un titulo y
    un objeto scope a un array.
    Este array se usa para mostrar una lista de tabs en lo mas alto.
 */
