angular.module('app').directive('availableEmail', function(Users, $q) {
    return {
      require: 'ngModel',
      controller: function($element) {
        var ngModelCtrl = $element.controller('ngModel');
        ngModelCtrl.$asyncValidators.availableEmail = function(modelValue, viewValue) {
          return Users.checkEmailAvailability(viewValue).catch(function(rejection) {
            ngModelCtrl.$setTouched();
            return $q.reject(rejection);
          });
        };
      }
    };
});
