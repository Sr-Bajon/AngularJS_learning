/*
  El ciclo de vida de una directiva

  Las directivas tienen su propio ciclo de vida que sigue una estructura similar
  a los otros ciclos de vida vistos, con algunas diferencias.

  1.  Cuando la aplicación carga, el objeto de definición de la directiva se
      ejecuta. Esto ocurre una sola vez, así que cualquier cosa declarada o
      expresada antes de devolver el objeto de definicio de la directiva puede
      ser tratado como el constructor por la directiva, y será ejecutada una
      sola vez la primera vez que carga la aplicación.
  2.  A continuación, cuando la directiva es encontrada en el HTML por primera
      vez, el template de la directiva se carga (ya sea asincronamente del
      servidor o directamente como un template desde la definición). En
      cualquier caso, el template es cacheado y reusado en proximas instancias
      de la directiva.
  3.  El template es entonces compilado y AngularJS maneja las otras directivas
      presentes en el HTML. Esto genera una funcion link que puede ser usada
      para linkar la directiva al scope.
  4.  El scope para la instancia de la directiva es creado o adquirido. Esta
      podria ser el parent scope o un scope aislado, depende de como se haya
      definido la directiva.
  5.  La función link y el controlador ejecutan la directiva. Aqui es donde
      añadimos funcionalidad que es especifica de cada instancia de la
      directiva.
 */
