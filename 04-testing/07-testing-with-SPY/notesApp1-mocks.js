// en este caso en vez de crear el servicio en el propio test, que sería
// apropiado si solo se va a usar en ese test, creamos un modulo-mock en la
// carpeta de test, de forma que podamos usarlo en varios test
// debe ser incluido en el archivo karma.conf.js

angular.module('notesApp1Mocks', [])
  .factory('ItemService', [function () {
    return {
      list: function () {
        return [{id: 1, label: 'Mock'}];
      }
    };
  }]);
