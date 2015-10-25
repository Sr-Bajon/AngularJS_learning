// se trata de una implementación de q
//  https://github.com/kriskowal/q

// Ejemplo de codigo con callbacks
// Fetch some server configuration
xhrGET('/api/server-config', function (config) {
  // Fetch the user information, if he's logged in
  xhrGET('/api/' + config.USER_END_POINT, function (user) {
    // Fetch the items for the user
    xhrGET('/api/' + user.id + '/items', function (items) {
      // Actually display the items here
    });
  });
});


// el mismo codigo con promesas
$http.get('/api/server-config')
  .then(function (configResponse) {
    return $http.get('/api/' + configResponse.data.USER_END_POINT);
  }).then(function (userResponse) {
    return $http.get('/api/' + userResponse.data.id + '/items');
  }).then(function (itemResponse) {
    // Display items here
  }, function (error) {
    // Common error handling
    // si ocurre algun error, angular buscará el siguiente manejador de errores
    // si lo ponemos al final, cualquier error será caputardo por el manejador
    // final

    // si la promesa no devuelve error pero no es el resultado que esperamos,
    // podemos hacer que la siguiente funcion de la promesa desencadene la
    // función de error, inyectando $q como dependencia y usando $q.reject(data)
    // la siguiente función de error obtendrá data como argumento.
  });


/*
  $q service:
  $q.defer() : Sirve para crear una promesa
  deferredObject.resolve : Resuelve la promesa creada con la funcion anterior
  deferredObject.reject : Rechaza la promesa y lanza el manejador de error.
  $q.reject() : Puede ser llamada tanto en el success como en el error y permite
    rechazar la promesa actual y lanzar el manejador de errores de la siguiente
    promesa encadenada con los datos que le pasemos a esta función.




 */
