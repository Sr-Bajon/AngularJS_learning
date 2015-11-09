/*
  en la clave resolve de $routeProvider.when podemos definir tareas asincronas
  para ejecutar antes de que se cargue la ruta.
  Un resolve es un set de claves y funciones, cada funcion retorna un valor o
  promesa.
 */

angular.module('resolveApp', ['ngRoute'])
  .value('Constant', {MAGIC_NUMBER: 42})
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<h1>Main Page, no resolves</h1>'
      })
      .when('/protected', {
        template  : '<h2>Protected Page</h2>',
        resolve   : {
          immediate: ['Constant', function (Constant) {
            return Constant.MAGIC_NUMBER * 4;
          }],
          async    : ['$http', function ($http) {
            return $http.get('/api/hasAccess');
          }]
        },
        controller: ['$log', 'immediate', 'async',
          function ($log, immediate, async) {
            $log.log('Immediate is ', immediate);
            $log.log('Server returned for async', async);
          }]
      });
  }]);

/*
  El ejemplo anterior espera que haya un server disponible con una API
  /api/hasAccess que ante una peticion GET responde con un 200 si tiene acceso,
  y no no 200 si no tiene acceso.

  Hay dos rutas, la primera carga el HTML directamente cuando coincide con su
  URL. No hay resolves en esta ruta.

  La segunda ruta contiene un resolve con dos claves, immediate y async.
  Estas claves tienen nombres elegidos por nosotros, se podrian haber llamado
  myKey1 y myKey2 perfectamente si hubieramos querido.
  Cada clave toma un array con la sintaxis de inyeccion de dependencias de
  Angular.

  immediate se le inycecta "Constant" que habiamos definido anteriormente con
  .value y devuelve la constante multiplicada por cuatro.

  async se le inyecta el service $http y hace una llamada al servidor a
  /api/hasAccess y devuelve la promesa correspondiente. AngularJS garantiza lo
  siguiente:
    * Si la función resolve devuelve un valor, AngularJS finaliza inmediatamente
      la ejecucion como satisfactoria.
    * Si devuelve una promesa, AngularJS espera a la promesa y la trata como
      satisfactoria si la promesa es satisfactoria. Si la promesa es rechazada
      el resolve se trata como fallo.
    * Por la función resolve, AngularJS se asegura que la ruta no se carga antes
      de que todas las funciones de resolve se hayan ejecutado y finalizado.
      Si hay multiples claves con funciones asincronas, Angular las ejecuta
      en paralelo y espera a que acaben todas.
    * Si se encuentra un error o una promesa es rechazada, la rota no se cargará

  Otra cosa interesante de resolve es que el resultado de las claves que tenga
  pueden ser inyectadas dentro del controlador añadiendolas como dependencias.
*/
  $http.get('/api/hasAccess').then(function(response) {
    console.log('I am passed to the controller', response);
    return response;
  });

