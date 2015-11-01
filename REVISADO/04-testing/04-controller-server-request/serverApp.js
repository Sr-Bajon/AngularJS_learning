/*
  Los test unitarios se encargan de testear componentes por separado, esto es,
  aislandolos del resto de la aplicación.
  En el caso de llamadas al servidor, y con angular-mocks.js podemos capturar
  estas llamadas y manejarlas.
 */
angular.module('serverApp', [])
  .controller('MainCtrl', ['$http', function ($http) {
    var self          = this;
    self.items        = [];
    self.errorMessage = '';

    $http.get('/api/note').then(function (response) {
      self.items = response.data;
    }, function (errResponse) {
      self.errorMessage = errResponse.data.msg;
    });
  }]);
