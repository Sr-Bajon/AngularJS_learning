// File: chapter6/public/logging-interceptor.js
angular.module('notesApp', [])
  .controller('MainCtrl', ['$http', function ($http) {
    var self       = this;
    self.items     = [];
    self.newTodo   = {};
    var fetchTodos = function () {
      return $http.get('/api/note')
        .then(
          function (response) {
            self.items = response.data;
          },
          function (errResponse) {
            console.log('Error while fetching notes');
          });
    };

    fetchTodos();

    self.add = function () {
      $http.post('/api/note', self.newTodo)
        .then(fetchTodos)
        .then(function (response) {
          self.newTodo = {};
        });
    };
  }]).factory('MyLoggingInterceptor', ['$q', function ($q) {
    return {
      request      : function (config) {
        console.log('Request made with ', config);
        return config;
        // If an error, not allowed, or my custom condition,
        // return $q.reject('Not allowed');
      },
      requestError : function (rejection) {
        console.log('Request error due to ', rejection);
        // Continue to ensure that the next promise chain
        // sees an error
        return $q.reject(rejection);
        // Or handled successfully?
        // return someValue
      },
      response     : function (response) {
        console.log('Response from server', response);
        // Return a promise
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        console.log('Error in response ', rejection);
        /* Continue to ensure that the next promise chain
         sees an error
         Can check auth status code here if need to
            if (rejection.status === 403) {
              Show a login dialog
              return a value to tell controllers it has
              been handled
            }
         Or return a rejection to continue the
         promise failure chain*/
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('MyLoggingInterceptor');
    // aqui añadimos la factoria a los interceptores de $http
    // los interceptores serán llamados antes de cada peticion al servidor
  }]);


/*
  La forma de crear un interceptor es mediante una factoria que devuelve un
  objeto con las siguientes propiedades. La factoria puede devolver una o varias
  de estas propiedades.

  request: Las peticiones pasarán por esta función, en ella podremos revisar
    la URL, los datos POST, el metodo ya sea GET o POST, etc. Y podremos decidir
    continuar con la peticion, en cuyo caso devolveremos config, o rechazarla
    usando $q.reject

  requestError: Se lanza si hay varios interceptores y uno de ellos rechaza la
    peticion en marcha. En ese caso el argumento de $q.reject se pasa a la
    funcion

  response: Al devolver el servidor la respuesta esta funcion es llamada,
    podremos revisar la configuracion, status code, headers y data.

  responseError: Si el servidor devuelve un no-200, Angular lo trata como un
    error, aqui podremos verificarlo y devolver un rechazo o devolver un valor
    para indicar que los errores han sido apropiadamente manejados.

 */
