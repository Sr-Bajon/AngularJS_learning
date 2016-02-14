angular.module('multiSlotTranscludeExample', [])
  .directive('pane', function () {
    'use strict';

    return {
      restrict  : 'E',
      transclude: {
        'title' : 'paneTitle',
        'body'  : 'paneBody',
        'footer': 'paneFooter'
      },
      controller: function ($scope, $attrs, $element, $transclude) {
        console.log(arguments);
      },
      template  : '<div style="border: 1px solid black;">' +
      '<div class="title" ng-transclude="title">Fallback Title</div>' +
      '<div ng-transclude="body"></div>' +
      '<div class="footer" ng-transclude="footer">Fallback Footer</div>' +
      '</div>'
    };
  })
  .controller('ExampleController', ['$scope', function ($scope) {
    'use strict';

    $scope.title = 'Lorem Ipsum';
    $scope.link  = "https://google.com";
    $scope.text  = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
  }])
;
