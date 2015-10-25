/*
  El ciclo de actualizaciones de Angular se llama digest cycle.
  El digest cycle en AngularJS es responsable de mantener la UI actualizada, el
  ciclo de actualizacion funciona así:

  1.  Cuando se carga la aplicación, o cuando el HTML se carga con Angular,
      Angular ejecuta el paso de compilación, y mantiene registro de todos los
      watchers y listeners que son necesarios para el HTML (ng-bind, ng-class y
      demas).
      Cuando son linkados con el scope, tenemos los valores actuales que son
      mostrados en la UI.
  2.  Angular mantiene un registro de todos los elementos que estan ligados al
      HTML por cada scope.
  3.  Cuando uno de los eventos que lanzan el ciclo de actualización ocurre,
      AngularJS lanza el digest cycle.
  4.  En el digest cycle, Angular comienza desde el $rootScope y chequea cada
      watcher en el scope para ver si el valor actual difiere del valor mostrado
      en la UI.
  5.  Si nada ha cambiado, va scope por scope verificando si hay cambios.
  6.  Si AngularJS encuentra un watcher de algun scope que reporte un cambio de
      estado, Angular para aqui y vuelve a lanzar el digest cycle.
  7.  Se vuelve a lanzar el digest cycle porque un cambio en un watcher puede
      tener una implicación en otro watcher que ha sido evaluado antes. Para
      asegurarse de que ningun dato que ha cambiado se pierda, se vuelve a
      lanzar el digest cycle.
  8.  Angular vuelve a lanzar el digest cycle cada vez que encuentra un cambio
      hasta que el digest cycle se estabiliza. Suele ser dos o tres ciclos por
      aplicación.
      a.  Para evitar un ciclo infinito, solo puede dar 10 vueltas como maximo.
  9.  Cuando el digest cycle se estabiliza, AngularJS acumula todos los cambios
      en la UI y los lanza todos a la vez.

  Como los watchers y listeners pueden ser ejecutados multiples veces por
  AngularJS en una sola actualización, se recomienda que cada watch que añadamos
  se ejecute muy rapido.
  Como regla general un watcher no debería tardar mas de 20 microsegundos, y no
  mas de 2000 variables deberían ser objetivo de watches en ningun momento de la
  aplicación.


 */
