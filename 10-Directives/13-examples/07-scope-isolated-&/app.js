(function () {
  'use strict';

  angular.module('app', [])
    .controller('MyController', function () {
      var myCtrl      = this;
      myCtrl.callHome = function () {
        alert('called home!');
      };

      var text = 'Es mi cumpleaños numero: ';
      myCtrl.callHome2 = function (value) {
        alert(text + value);
      };
    })
    .directive('phone', function () {
      return {
        restrict: 'E',
        scope   : {
          dial: '&'  // en este ejemplo dial contiene la definición de una
                     // función, que le hemos pasado mediante un atributo.
                     // ademas esta función tiene el contexto del scope donde
                     // se encuentra la directiva
        },
        template: '<input type="button" ng-click="dial()" value="Pulsa Aqui">'
      };
    })
    .directive('phone2', function () {
      return {
        restrict: 'E',
        scope   : {
          dial: '&'  // En este ejemplo al igual que el anterior le pasamos una
                     // funcion, pero en esta ocasión la función espera un parametro
                     // en la directiva le pasamos el parametro con una sintaxis especial
                     // {message:123} donde message o el nombre que le demos será el nombre
                     // del argumento de la función y el valor será el valor de este argumento
                     // <phone2 dial="myCtrl.callHome2(message)"></phone2>
        },
        template: '<input type="button" ng-click="dial({message:123})" value="Pulsa Aqui">'
      };
    });

})();


/*
angular.module('myApp', [])
.directive('myDirective', function() {
return {
 restrict: String,
 priority: Number,
 terminal: Boolean,
 template: String or Template Function: function(tElement, tAttrs),
 templateUrl: String,
 replace: Boolean or String,
 scope: Boolean or Object,
 transclude: Boolean,
 controller: String or function(scope, element, attrs, transclude, otherInjectables) { ... },
 controllerAs: String,
 require: String,
 link: function(scope, iElement, iAttrs) { ... },
 compile: // return an Object OR the link function
         // as in below:
         function(tElement, tAttrs, transclude) {
           return {
             pre: function(scope, iElement, iAttrs, controller) { ... },
             post: function(scope, iElement, iAttrs, controller) { ... }
           };
           // or
           return function postLink(...) { ... }
       }
};
});
* */
