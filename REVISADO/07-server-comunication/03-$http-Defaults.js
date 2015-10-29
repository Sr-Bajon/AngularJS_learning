// veamos como configurar algunas cabeceras y un transformRequest por
// defecto usando $httpProvider

angular.module('notesApp', [])
  .controller('LoginCtrl', ['$http', function ($http) {
    var self     = this;
    self.user    = {};
    self.message = 'Please login';
    self.login   = function () {
      $http.post('/api/login', self.user).then(
        function (resp) {
          self.message = resp.data.msg;
        });
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
  // Every POST data becomes jQuery style
    $httpProvider.defaults.transformRequest.push(
      // las claves transform... de $http son arrays y podemos añadir las
      // funciones que queramos
      function (data) {
        var requestStr;
        if (data) {
          data = JSON.parse(data);
          for (var key in data) {
            if (requestStr) {
              requestStr += '&' + key + '=' + data[key];
            } else {
              requestStr = key + '=' + data[key];
            }
          }
        }
        return requestStr;
      });
      // Set the content type to be FORM type for all post requests
      // This does not add it for GET requests.
    $httpProvider.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
  }]);

/*
  Estas son las propiedades supceptibles de tener defaults.

  • headers.common
  • headers.get
  • headers.put
  • headers.post
  • transformRequest  // array of functions
  • transformResponse // array of functions
  • xsrfHeaderName    // string
  • xsrfCookieName    // string


 */
