/*
El servicio ngResource envuelve el servicio $http y nos permite usar la API con
un lenguaje mas natural, en caso de que esté construida de una forma estandar.

Considera una API como la siguiente:

GET request to /api/project/ devuelve un array de proyectos
GET request to /api/project/17 devuelve el proyecto con ID 17
POST request to /api/project/ con un objeto de tipo proyecto como JSON, crea un
  nuevo proyecto
POST request to /api/project/19 con un objeto de tipo proyecto como JSON,
  actualiza el proyecto con ID:19
DELETE request to /api/project/ borra todos los proyectos
DELETE request to /api/project/23 borra el proyecto de ID:23

Si tuvieramos una API como esa, en vez de crear manualmente recursos para el
proyecto haciendo funciones con $http para las peticiones individualmente,
podriamos crear un servicio así:
*/

angular.module('resourceApp', ['ngResource'])
 .factory('ProjectService', ['$resource', function ($resource) {
   return $resource('/api/project/:id');
 }]);

/*
Esto nos da automaticamente los siguientes metodos:
• ProjectService.query() para obtener una lista de proyectos
• ProjectService.save({id: 15}, projectObj) para actualizar el proyecto con ID:15
• ProjectService.get({id: 19}) para obtener el proyecto individual con ID:15
etc, para obtener mas información dirigirse a la documentacion de AngularJS:

https://docs.angularjs.org/api/ngResource/service/$resource
*/
