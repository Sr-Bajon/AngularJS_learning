angular.module('app', ['ui.router', 'ngMessages']);
  
angular.module('app').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        template: '<signup></signup>'
    });

    $urlRouterProvider.otherwise('/signup');
});
