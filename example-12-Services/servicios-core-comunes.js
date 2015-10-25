/*
  Algunos servicios comunes son:

  $window: Envuelve el objeto global window.

  $location: Nos permite interactuar con la URL.
    absUrl: Obtiene la URL actual
    url: setter y getter de la URL
    path: getter y setter del path de la URL, le pone la barra (slash)
      automaticamente delante, $location.path('new') => /new
    search: getter y setter del search de una URL.
      $location.search()        => elimina el search actual
      $location.search('test')  => obtiene el search
      $location.search('test', 'abc')  => pone el search

  $http: Sirve para hacer peticiones XHR al servidor desde nuestra aplicacion.
    Podemos hacer peticiones GET y POST, establecer la cabecera y el cacheo, y
    obtener la respuesta del servidor o lidiar con los fallos del mismo.

 */


/*
  Cuando crear un servicio?:
  * Necesita ser reusable
  * Necesitamos que mantenga el estado a traves de la aplicacion
  * Es independiente de la vista, no como el controlador
  * Necesitamos integrar un servicio third-party, pero queremos ser
    capaces de mokearlo o reemplazarlo en nuestros test
  * Necesitamos un objeto de cache?, o algo que cree objetos modelo
 */

