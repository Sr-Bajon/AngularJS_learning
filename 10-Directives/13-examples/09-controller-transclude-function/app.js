(function () {
  'use strict';

  angular.module('app', [])
    .controller('MyController', function () {
      var myCtrl   = this;
      myCtrl.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    })
    .directive('miPrueba', function () {
      return {
        restrict  : 'E',
        transclude: true,
        scope     : {
          ngModel: '=',
          repetir : '@repetir'
        },
        controller : function($scope, $element, $attrs, $transclude, $log){
          var transcludedContent = $transclude();

          $transclude(function(clonedTranscludedContent){
            console.log(clonedTranscludedContent);
          });



          $element.find('h1').append(transcludedContent);
          // es mala practica modificar el DOM en el controlador, pero para el
          // ejemplo está bien.
        },
        //template  : 'El texto se va a repetir: {{repetir}} 3 veces<h1><div ng-repeat=" n in ngModel |limit:repetir"><ng-transclude></ng-transclude></div></h1>'
        template  : 'El texto se va a repetir: {{repetir}} 3 veces<h1><div ng-repeat=" n in ngModel |limitTo:repetir">Numero: {{$index}}</div></h1>'
      };
    })
  ;

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
