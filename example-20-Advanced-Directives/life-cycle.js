/*
  El ciclo de vida en AngularJS

  Como instancia AngularJS una directiva y usa el objeto de definicion de la
  directiva. Para entender esto hay que saber como funciona el ciclo de vida
  de AngularJS.

  Al cargar AngularJS en el navegador, ocurren los siguientes eventos:
  1.  El HTML de la pagina se carga
    a)  El HTML carga el codigo fuente de AngularJS (opcionalmente JQuery se
        cargaría antes)
    b)  El HTML carga el codigo Javascript de la aplicación.
  2.  El HTML termina de cargar.
  3.  Cuando el evento document ready se lanza, AngularJS se inicia y busca
      cada instancia del atributo ng-app en el HTML.
    a)  Si AngularJS se inicia manualmente (bootstrapped manually), esto
        necesita ser ejecutado por el codigo que escribamos.
  4.  Dentro del contexto de cada ng-app, AngularJS comienza ejecutando el
      codigo HTML que encuentre dentro de cada directiva ng-app en lo que se
      conoce como el compile step (paso de compilación):
    a)  El compile step va sobre cada linea HTML y busca directivas AngularJS
    b)  Por cada directiva, ejecuta el codigo necesario definido por el objeto
        de definicion de esa directiva.
    c)  Al final del compile step, una link function es generada para cada
        directiva que maneja todos los elementos y atributos que necesiten ser
        controlados por AngularJS.
  5.  AngularJS toma la link function y la combina con el scope. El scope tiene
      las variables y contenidos que necesitan ser mostrados en la UI. Esta
      combinación general la live view (vista viva) que el usuario ve y con la
      que interactua.
    a)  AngularJS tomará las variables en el scope, y las mostrará en la UI si
        el HTML hace referencia a alguna variable del scope
    b)  Cada controlador y subcontrolador es instanciado con su propio scope que
        será usado para mostrar datos en la UI.
    c)  AngularJS tambien añade watchers y listeners para todas las directivas
        y bindeos asegurar que sabe todos los campos que necesita observar y
        que campos bindear con cada cual.
  6.  Al final de esto, tenemos una vista viva e interactiva con el contenido
      rellenado para el usuario.


  En este punto, en el que el HTML está bindeado con los datos del scope, en
  que momento necesita la UI ser actualizada?
    - Nuestra primera inclinación sería hacer la comprobación periodicamente si
      alguna de las variables tienen cambios, y si es así actualizar la UI.

      Esto requiere una función de fondo que compruebe a cada segundo, por
      ejemplo. Pero esto es suboptimo y resultaría en un framework lento, así
      que es una mala idea.
    - La otra aproximacion es ser inteligente acerca de actualizar la UI, y es
      como funciona Angular si pensamos sobre ello, el modelo que conduce la
      aplicación no puede cambiar aleatoriamente. Solo puede hacerlo en
      respuesta a uno de los siguientes eventos.
      * El usuario hace una modificación en un formulario o elemento input
      * Se hace una petición al servidor y este responde
      * Un $timeout o $interval es usado para hacer algo asincronamente.

  Fuera de estos eventos, los datos no pueden cambiar aleatoriamente por si
  solos, así que AngularJS añade watchers para todos sus bindeos y ng-model.
  Y cuando uno de los mencionados eventos ocurre, AngularJS mira si los
  observadores y bindeos han sufrido cambios, si nada ha sucedido, AngularJS
  sigue como si nada, pero si Angular encuentra que uno de los campos que
  controla ha cambiado, se actualizaría la UI.
 */
