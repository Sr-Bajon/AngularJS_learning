/*
  AngularJS añade listeners y watchers para mantener la UI actualizada cuando
  usamos bindings y otras directivas. Para asegurarse que estos no permanecen
  cuando no se necesitan, AngularJS los elimina cuando sus scopes y elementos
  son destruidos.

  Cuando creamos directivas en AngularJS con sus propios Scope (child o isolate)
  cualquier watcher que añadamos al scope y cualquier listener que añadamos al
  elemento pasado a la directiva son automaticamente eliminados cuando la
  directiva es destruida en la UI.

  Esto es, AngularJS no puede limpiar event listeners que nosotros añadimos a
  elementos fuera del scope y el HTML de la directiva. Cuando añadimos estos
  elementos o watchers, es nuestra responsabilidad limpiarlo cuando la directiva
  sea destruida.

  Podemos estar escuchando si sucede la destruccion de una directiva de dos
  formas:

  1.  Escuchar el evento $destroy del scope.

      Como hemos visto, podemos añadir listeners al scope. Cada scope lanza un
      evento llamado $destroy, que es una notificacion del scope cuando va a ser
      destruido y limpiado.
      Cualquier controlador y directiva puede escucharlo y añadir limpieza
      adicional cuandl el evento se lanza.
      Cualquier listener que manualmente añadimos o intervals o timeouts que
      se esten acutalmente ejecutando deben ser destruidos en el evento $destroy

        $scope.$on('$destroy', function() {
          // Do clean up here
        });


  2.  Escuchar el evento $destroy del elemento

      Si el scope es heredado (no un nuevo scope o un isolated scope), pero
      aun así necesitamos limpiar cuando la directiva es destruida, la otra
      alternativa es escuchar el evento $destroy del elemento.

      Se trata de un evento jQuery que se lanza por AngularJS cuando el elemento
      se va a eliminar del DOM.

      $element.$on('$destroy', function() {
        // Do clean-up here
      });

 */
