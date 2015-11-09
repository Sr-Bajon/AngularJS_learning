// File: serverAppWithService.js
/*
  Que pasa si seguimos las buenas practicas, y no hacemos las llamadas al
  servidor desde nuestro controlador, sino que delegamos esto en un servicio?.

  En este caso, tenemos dos opciones para testear:

  1) Escribir un test unitario y mockear (spy on) el servicio NoteService, y
     asegurarnos de que nuestro controlador delega en NoteService y el flow
     y los argumentos son correctos.

  2) Escribir un test de integración que se concentré en mockear el backend
     y checkear el flow por completo.
 */

angular.module('serverApp2', [])
  .controller('MainCtrl', ['NoteService', function (NoteService) {
    var self          = this;
    self.items        = [];
    self.errorMessage = '';

    NoteService.query().then(function (response) {
      self.items = response.data;
    }, function (errResponse) {
      self.errorMessage = errResponse.data.msg;
    });
  }])
  .factory('NoteService', ['$http', function ($http) {
    return {
      query: function () {
        return $http.get('/api/note');
      }
    };
  }]);
