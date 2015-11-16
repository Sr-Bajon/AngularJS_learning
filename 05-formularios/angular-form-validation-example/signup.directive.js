angular.module('app').directive('signup', function($location, $state, $stateParams) {
    return {
        templateUrl: 'signup.directive.html',
        scope: {},
        bindToController: true,
        controllerAs: 'vm',
        controller: function() {
            var vm = this;
            vm.submit = function() {
              alert('Sign Up successful!');
            };
        }
    };
});
