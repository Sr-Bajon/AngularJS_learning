angular.module('googleChartApp')
  .factory('googleChartLoaderPromise',
  ['$q', '$rootScope', '$window',
    function ($q, $rootScope, $window) {
      // Create a Deferred Object
      var deferred = $q.defer();
      // Load Google Charts API asynchronously
      $window.google.load('visualization', '1',
        {
          packages: ['corechart'],
          callback: function () {
            // When loaded, trigger the resolve,
            // but inside an $apply as the event happens
            // outside of AngularJS life cycle
            $rootScope.$apply(function () {
              deferred.resolve();
            });
          }
        });
      // Return the promise object for the directive
      // to chain onto.
      return deferred.promise;
    }]);

/*
  Esta factoria carga la libreria de visualización y devuelve una promesa que
  puede ser encadenada para saber cuando está completa.

  Hace esto uasndo el servicio $q, ademas, para poder rechazar la promesa actual
  usando $q.reject(data), el servicio $q permite crear y trabajar con nuestras
  propias promesas, que es lo que usamos aqui.

  Creamos un objeto deferred, que representa una tarea asincrona que será
  terminada en el futuro. Esto se hace llamando a $q.defer().
  Despues devolvemos deferred.promise, a lo que los usuarios de la API pueden
  añadirle un .then despues.

  Luego llamamos a la API de googleCharts con los parametros apropiados para
  cargar la librería y le damos un callback para que sea notificada cuando la
  tarea asincrona se complete.

  Dentro del callback, resolvemos el objeto deferred que hemos creado, lanzando
  todos los .then que hayamos creado.

  Pero como este callback es llamado fuera del ciclo de vida de AngularJS,
  necesitamos envolverlo en un $rootScope.$apply para asegurar que AngularJS
  sabe que tiene que repintar la UI y ejecutar un digest cycle completo como
  se necesita.


 */
