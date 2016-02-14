(function () {
  'use strict';

  angular.module('app', [])
    .directive('myPrueba', myPrueba);

  myPrueba.$inject = ['$timeout'];

  function myPrueba($timeout) {
    var result = {
      restrict   : 'EA',
      templateUrl: 'template1.html',
      scope      : {} // esta directiva no tiene scope
                      // isolated scope
    };

    /////

    return result;
  }
})();


(function () {
  'use strict';

  angular.module('app')
    .controller('MyController', [function () {
      var myCtrl          = this;
      myCtrl.bidideep2    = 'bidirectional DeepWatch con otro nombre';
      myCtrl.bidishallow  = 'bidirection ShallowWatch';
      myCtrl.bidishallow2 = 'bidirection ShallowWatch con otro nombre';
      myCtrl.objeto       = {clave: 'valor'};
      myCtrl.method       = function () {
        return myCtrl.objeto.clave;
      };
    }])
    .directive('myPrueba2', myPrueba2);

  myPrueba2.$inject = [];

  function myPrueba2() {
    var result = {
      restrict    : 'EA',
      templateUrl : 'template2.html',
      scope       : {
        copy                    : '@',      // string copy
        copyWithOtherName       : '@copy2', // string copy with name change
        copyOptional            : '@?',     // string copy optional
        bidideep                : '=',      // bi-directional model copy deep watch
        bidiDeepWithOtherName   : '=bidideep2',  // bi-directional model copy with name change deep watch
        bidishallow             : '=*',  // bi-directional model copy with shallow watch
        bidiShallowWithOtherName: '=*bidishallow2',  // bi-directional model copy with name change shallow watch
        bidiOptional            : '=?'  // bi-directional model optional copy
      },
      controller  : function ($scope, $element, $attrs, $transclude, $timeout) {
        var ctrl = this;
        $timeout(function () {
          $scope.bidideep = 'no tanto';
        }, 3000);

      },
      controllerAs: 'ctrl'

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
