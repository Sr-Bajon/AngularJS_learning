angular.module('app').factory('Users', function($timeout, $q) {
  return {
    checkEmailAvailability: function(email) {
      return $timeout(function() {}, 1500).then(
        function() {
          // For fun, we'll randomly fail ~50% of checks
          if (Math.random() > 0.5) {
            return;
          }
          return $q.reject();
        }
      );
    }
  };
});
