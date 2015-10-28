/*

  GENERAL
  * Mejor archivos pequeños que grandes, mas faciles de mantener, debugear y entender. Por ejemplo
    una regla es mantenerlos por debajo de las 100 lineas.
  * Usar la version de AngularJS de setTimeout con $setTimeout, será posible controlarlo en los test
    y el otro no.
  * Cualquier controller o directive, si añade $timeout o $interval, debes recordar limpiarlo o
    cancelarlo cuando es destruido, para prevenir que se siga ejecutando en el background.
  * Si añades listeners fuera de AngularJS, asegurate de limpiarlos correctamente. AngularJS añade
    sus propios scopes y listeners, pero todo lo que añadas manualmente tienes que manejarlo y
    limpiarlo.
    Puedes aadir esto cuando el scope es destruido.

      $scope.$on('$destroy', function(){})
  * Intenta evitar hacer deep watches ($scope.$watch con el tercer argumento a true). Es costoso
    y puede provocar problemas de rendimiento. En vez de eso, usa una clave Boolean que refleje que
    algo ha cambiado en el objeto.
  * Intenta seguir el paradigma de AngularJS, model-driven programming. El modelo y los datos deben
    conducir la UI, y si necesitas actualizar la UI todo lo que deberias hacer es actualizar el
    modelo. La UI se deberia actualizar automaticamente.
  * Usa HttpInterceptors cuando tengas tareas comunes que necesites hacer cada vez que el servidor
    devuelva un error de autorización, o un 404 not found. Deja que los servicios y controladores
    se ocupen solo de los errores especificos.


  SERVICIOS
    * Los servicios son singletons para tu aplicacion, usalos como data store, cache.
    * Si necesitas compartir estado a traves de la aplicación, piensa en un servicio.
    * No hay diferencia de rencimiendo entre usar un servicio, una factoria o un provider. Todos
      se implementan de la misma forma, usa el que mas se adapte a tu estilo.
    * Los servicios son el unico sitio donde añadir event listeners en el $rootScope es aceptable.
      Esto es porque los servicios no tienen su propio scope.
    * Las llamadas XHR deberían hacerse en servicios usando $http. Esto te da un unico lugar para
      mirar las llamadas de tu API, y cambiar las URLs en un solo lugar. El servicio debe devolver
      una promesa para asegurar que sea una API consistente.
    * La integración con librerias de servicios third-party (como socket UI) deberían hacerse con
      un servicio. Esto te permite integrar y reemplazarlo sin problemas en un momento dado, asi
      como mockearlo para los test unitarios.

  CONTROLADORES
    * Usa la sintaxis nueva, o define las variables y funciones en el this del controller. Esto es,
      usa la sintaxis controllerAs y evita usar $scope cuando sea posible. La nueva sintaxis es mas
      concisa y facil de entender.
    * Cuidado al usar this, asignala mejor a una variable local como self.
    * Los controladores no deberian referenciar al DOM. No uses jQuery en los controladores.
    * Los controladores idealmente solo deberian tener logica de presentacion sobre que datos
      capturar, como mostrarlos y como manejar interacciones con el usuario. Y la mayoria de estas
      deberian pasar a traves de un servicio cuando sea posible.
    * Pon solo las funciones y variables que vayan a ser accedidas por el HTML en el this del
      controller, todo lo que el HTML no necesite debe estar en variables locales del controller.
      La exepcion, por supuesto, son funciones que quieras testear unitariamente.
    * Si un controlador es para una ruta especifica que necesita accederse via URL, asegurate que
      ese controlador carga todos los datos necesarios cuando es instanciado.
    * Si un controlador necesita almacenar algun estado para toda la aplicación, debería almacenarse
      en un servicio, y no en el $rootScope. Nunca en el $rootScope.
    * Controladores pueden $broadcast o $emit eventos sobre su propio scope, o inyectarlos en el
      $rootScope o lanzar eventos sobre el $rootScope. Pero un controlador nunca debe añadir un
      listener en el $rootScope. Esto es porque un contralador y su scope pueden ser destruidos,
      pero $rootScope permanece a lo largo de toda la aplicación, con sus listeners, que continuarán
      lanzandose aunque el controller ya no esté.

  DIRECTIVES
    * Si coges un componente UI third-party, ponlo en una directiva AngularJS
    * Trata de aislar el scope si quieres componentes reusables, porque esto asegura que no
      modificas el parent scope, o depende de nada fuera de su scope.
    * No olvides hacer $scope.$apply() en caso que respondas a un evento o callback externo a
      AngularJS y que actualice el model de AngularJS. De otra forma, la UI no se actualizará en
      el momento correcto.
    * Si añades event listeners a elementos externos a la directiva, o polling functions (funciones
      de votacion o sondeo?), asegurate que lo limpias cuando la directiva es destruida.
    * Deberias hacer limpieza sobre el evento $destroy del $scope si estas creando un child scope
      o un isolated scope. Pero en caso de que heredes el scope padre, es preferible hacer limpieza
      en el evento $destroy del $element.
    * Si una directiva debe compartir estado con un controlador deberia:
        - Pasar el estado usando atributos HTML (con scope aislado) si el componente no es
          especifico de tu proyecto y puede ser reutilizable.
        - Pasar el estado a traves de un servicio si es un componente especifico.
    * Pasa un objeto usando el binding = del scope, y añade un $scope.$watch en el si necesitas
      realizar operaciones cuando el objeto cambie.
    * Nunca reasignes la referencia a un objeto pasado a traves del scope. Esto es, si
      scope.firstObject es pasado via = binding, nunca deberias setear o sobreescribir el valor de
      scope.firstObject en tu directiva. Actualizar una clave de firstObject esta bien, pero
      firstObject en si mismo nunca debería ser reasignado.

  FILTROS
    * Cada filtro usado en HTML es evaluado en cada digest cycle. Si sabes que los datos no van a
      cambiar muy a menudo, puedes optimizarlo usando y aplicando el filtro directamente en el
      controlador en vez de en el HTML, así podremos controlar exactamente cuando aplicarlo.
    * Los filtros deberian ser rapidos, porque se espera que cada filtro se ejecute multiples veces
      durante el ciclo de vida de la aplicación. Asi que no hagas procesos largos y definitivamente
      nada de manipulación DOM dentro del filtro.

*/
