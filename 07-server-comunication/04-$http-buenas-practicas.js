// 1. La forma correcta de usar $http es en un servicio de forma que desde
// el controlador se la pueda llamar y encadenar la promesa con otras funciones
angular.module('notesApp', [])
  // esta factoria devuelve una promesa que puede ser manejada en un controlador
  .factory('NoteService', ['$http', function ($http) {
    return {
      query: function () {
        return $http.get('/api/notes');
      }
    };
  }]);

// 2. Uso de interceptores.
// Hay casos comunes como logear la peticion o añadir alguna cabecera de
// autorizacion. Un ejemplo de un interceptor que maneja una respuesta de
// usuario no autorizado 403, y añade una cabecera de autenticacion a cada
// peticion
angular.module('notesApp', [])
  .factory('AuthInterceptor',
  ['AuthInfoService', '$q', function (AuthInfoService, $q) {
    return {
      request      : function (config) {
        if (AuthInfoService.hasAuthHeader()) {
          config.headers['Authorization'] = AuthInfoService.getAuthHeader();
        }
        return config;
      },
      responseError: function (responseRejection) {
        if (responseError.status === 403) {
          // Authorization issue, access forbidden
          AuthInfoService.redirectToLogin();
        }
        return $q.reject(responseRejection);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }]);

// 3. Encadenar interceptores
// En vez de crear un interceptor gigante para hcer todo el trabajo, es mejor
// crear multiples pequeños interceptores, cada uno de ellos con una
// responsabilidad individual.
// Los interceptores serán llamados en el orden al que lo añademos al provider
// por lo que podemos controlar el orden en que serán llamados.

// 4. Si nos encontramos usando las mismas cabeceras una y otra vez, o añadiendo
// la misma transformacion para la peticioon o la respuesta, devemos considerar
// usar defaults. Si todos nuestros endpoints devuelven XML en vez de JSON,
// añade un transformResponse por defecto a $httpProvider. Podemos añadir
// defaults solo para peticiones GET o POST, asi que puedes ser tan especifico
// como quieras.
