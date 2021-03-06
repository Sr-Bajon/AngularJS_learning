(function(){
  'use strict';

  angular.module('app', [])
    .directive('myPrueba', myPrueba);

  myPrueba.$inject = [];

  function myPrueba(){
    var result = {
      restrict: 'EA',
      templateUrl: 'template1.html'
    };

    /////

    return result;
  }
})();

(function(){
  'use strict';

  angular.module('app')
    .directive('myPrueba2', myPrueba2);

  myPrueba2.$inject = [];

  function myPrueba2(){
    var result = {
      restrict: 'EA',
      templateUrl: function(tElement, tAttrs){
        return tAttrs.nombreTemplate;
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
