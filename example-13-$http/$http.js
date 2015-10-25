/*
  $http provee los siguientes metodos:

  GET
  HEAD
  POST
  DELETE
  PUT
  JSONP

  cada uno de estos metodos puede ser usado de una de estas dos formas:
  - La funcion toma dos argumentos, la URL como primer argumento, y un objeto de
    configuracion como segundo argumento. GET
  - Tres argumentos, la URL, los datos, un objeto de configuración. POST, PUT

   $http.get(url, config)
   $http(config)  // en este caso la URL forma parte del objeto de configuracion.
   $http.get(url) // el objeto de configuracion es opcional
 */

// El objeto de configuración:
var confObj = {
  method           : string, // GET , POST, PUT ...
  url              : string,
  params           : object, // [{key1: 'value1', key2: 'value2'}] => ?key1=value1&key2=value2
  data             : string, // or object
  headers          : object, // {'Content-Type': 'text/csv'}
  xsrfHeaderName   : string, // para evitar ataques XSRF
  xsrfCookieName   : string, // // para evitar ataques XSRF
  transformRequest : function transform(data, headersGetter){}, // or an array of functions
  transformResponse: function transform(data, headersGetter){}, // or an array of functions
  // transform... transforma los datos de la peticion y la respuesta
  cache            : boolean, // or Cache object, si es true Angular cachea la
                              // respuesta y la usa para futuras peticiones a
                              // la misma URL
  timeout          : number,  // or promise object
                              // milisegundos para el timeout
  withCredentials  : boolean
};
