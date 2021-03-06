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
          ngModel: '='
        },
        template  : '<h1><div ng-repeat=" n in ngModel"><ng-transclude></ng-transclude></div></h1>'
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
