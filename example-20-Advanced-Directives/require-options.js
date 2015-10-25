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
  Hemos visto en el ejemplo de transclude e interporeabilidad entre directivas
  el uso de la clave require en el objeto de definicion de la directiva.

  La clave require toma un string o un array de strings, siendo cada uno el
  nombre de la directiva que debe usarse en conjunción con la directiva actual:

    require: 'tabs'

  Le dice a Angular que busque una directiva llamada tabs, que exponga un
  controlador en el mismo elemento de la directiva.

    require: ['tabs', 'ngModel']

  Le dice a AngularJS que ambos, tabs y ngModel deben estar presentes en el
  elemento en que nuestra directiva es usada. Cuando es usado como un array, la
  funcion link toma un array de controladores como cuarto argumento, en vez de
  un solo controlador.

  Ahora, cada string individual toma algunos prefijos, que definen como Angular
  debe comportarse cuando encuentra estas directivas.

    require: 'tabs'

  implica que Angular debe localizar la directiva tabs en el mismo elemento, y
  lanzar un error si no es encontrada

    require: '?tabs'

  AngularJS tratará de localizar la directiva en el mismo elemento, pero pasará
  null como cuarto argumento de la función link si no lo encuentra. La directiva
  será una dependencia opcional.

    require: '^tabs'

  La directiva debe estar presente como uno de los padres del elemento (no
  necesariamente el padre inmediato)

    require: '?^tabs'

  Busca el elemento padre que tenga la directiva tabs pero es opcional.

 */
