// Without Dependency Injection
function fetchDashboardData() {
  var $http = new HttpService();
  return $http.get('my/url');
}

// With Dependency Injection
function fetchDashboardData2($http) {
  return $http.get('my/url');
}


// vemos que en el primer caso se instancia $http y en el segundo se le pasa
// como argumento, por lo que puede usarlo directamente.

/*
 Las desventajas de no usar DI son:
 * Como se crea una nueva instancia de $http los test que escribamos para esta
    funcion dependen del servicio $http implicitamente.
 * Si extendemos el servicio nos veremos forzados a cambiar cada implemntacion
    cuando new sea usado.
 * Si esta inherenetemente atado a HttpService, será dificil reusarlo para
    otros casos.

*/
/*
  Las ventajas son:
  * Cambiar la implementacion de las dependencias sin cambiar cada funcion que
      dependa de ella
  * Cambiar la implementacion solo para los test previendo que haga llamadas al
      servidor por ejemplo
  * Mostrar explicitamente que se debe incluir antes de que se ejecute la
      funcion
  * Angular garantiza que la funcion que proveemos para el servicio será ejecutada
      una sola vez (lazily), y futuras dependencias usarán la misma instancia.
*/
