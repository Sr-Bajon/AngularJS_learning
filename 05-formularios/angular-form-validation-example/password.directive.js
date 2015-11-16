angular.module('app').directive('password', function ($timeout) {
  return {
    require: 'ngModel',
    controller: function ($element) {
      var ngModelCtrl = $element.controller('ngModel');

      ngModelCtrl.$validators.password = function (modelValue, viewValue) {
        console.log('eh', modelValue, viewValue);

        return viewValue && viewValue.length >= 8 &&
            /[0-9]/.test(viewValue) &&
            /[a-z]/i.test(viewValue);
      };
    }
  };
});
