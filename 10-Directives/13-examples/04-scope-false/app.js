(function(){
  'use strict';

  angular.module('app', [])
    .directive('myPrueba', myPrueba);

  myPrueba.$inject = ['$timeout'];

  function myPrueba($timeout){
    var result = {
      restrict: 'EA',
      templateUrl: 'template1.html',
      scope: false, // opcion por defecto
                    // mismo scope que el padre
      link: function(scope, iEle, iAttr){
        $timeout(function(){
          scope.myVar = 'Adios';
        }, 5000);
      }
    };

    /////

    return result;
  }
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
