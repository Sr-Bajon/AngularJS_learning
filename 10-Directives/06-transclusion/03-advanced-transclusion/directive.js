angular.module('stockMarketApp').directive('simpleStockRepeat',
  [function () {
    return {
      restrict  : 'A',
      // Capture and replace the entire element
      // instead of just its content
      transclude: 'element',
      // A $transclude is passed in as the fifth
      // argument to the link function
      link      : function ($scope, $element, $attrs, ctrl, $transclude) {
        var myArray   = $scope.$eval($attrs.simpleStockRepeat);
        var container = angular.element(
          '<div class="container"></div>');
        for (var i = 0; i < myArray.length; i++) {
          // Create an element instance with a new child
          // scope using the clone linking function
          var instance = $transclude($scope.$new(),
            function (clonedElement, newScope) {
              // Expose custom variables for the instance
              newScope.currentIndex = i;
              newScope.stock        = myArray[i];
            });
        // Add it to our container
          container.append(instance);
        }
        // With transclude: 'element', the element gets replaced
        // with a comment. Add our generated content
        // after the comment
        $element.after(container);
      }
    };
  }]);

/*
  * El primer cambio es en la clave transclude del objeto de definicion de la
    directiva. En el ejemplo previo, lo hemos seteado a true, que le dice a
    Angular que coja el contenido del elemento en el que se encuentre la
    directiva y lo retenga. Cuando especificamente transcludimos un elemento,
    se notifica a AngularJS que lo copie entero, junto con todas las directivas
    que podrían estar presentes el para la transclusion.
  * La funcion link, toma tres argumentos por defecto, el scope de la directiva,
    el elemento en el cual la directiva está presente, y los atributos del
    elemento.
    Ademas, podemos pasar directive controllers a la directiva como cuarto
    argumento. Pero el quinto argumento es el de que nos vamos a ocupar, el
    cual es una función transclusion que es generada solo cuando usemos la clave
    transclude en el objeto de definicion de la directiva.
    Esta funcion transclude es un contructor que nos permite crear nuevas
    instancias de nuestros templates tantas veces como haga falta dependiendo
    de nuestro caso de uso. La función toma un scope opcional (si un nuevo
    scope se necesita para el elemento, de otra forma, hereda el scope de la
    directiva) y una funcion linking obligatoria como segundo argumento.
  * En la primera linea, evaluamos la variable mencionada en el HTML junto con
    la directiva para manejar el array que queremos que se repita. Esto se hace
    llamando a $eval sobre el scope con un string que contiene el Javascript
    que queremos evaluar en el contexto del scope.
  * Porque el elemento transclude copia el elemento entero, tambien elimina el
    elemento del HTML. Asi que creamos un elemento contenedor donde poner todas
    las instancias creemos.
  * Luego ejecutamos un bucle foor por cada instancia de nuestro array, que
    llama a la funcion transclude que es pasada a la funcion linking.
    Esto devuelve un nuevo elemento HTML que esta completamente compilado y
    linka una version de nuestro template que puede ser insertado dentro de
    nuestro cuerpo principal.
  * Como hemos mencionado previamente, el primer argumento de la función
    transclude es un scope opcional. En el ejemplo, creamos un nuevo child
    scope. Eso es asi para que modificación hecha al scope no se refleje en el
    scope del elemento padre. Esto es siempre una buena practica para asegurar
    que no se acumulen global states uno sobre otro.
  * Entonces añadimos la instancia creada de nustro template al elemento
    contenedor, y finalmente añadimos el elemento contenedor despues de la
    instancia de nuestra directiva (que en este punto es solo un node de
    comentario en el HTML).
    Sin este paso, tendriamos un elemento listo AngularJS de tipo DOM,
    completamente compilado y funcionando que no apareceria en la UI renderizada.



En general, podemos usar el concepto transclude cada vez que queramos un
componente  cuyo template y UI dependan de su uso y contexto. Podemos guiarnos
por los siguientes criterios:
  * Necesita cada usuario de la directiva especificar su propio template o
    logica de renderizado?
  * Es solo el contenido de la directiva importante, o es el elemento en cuya
    directiva es aplicada necesaria tambien? Usa transcule: true  en el primer
    caso y transclude: element en el ultimo.
  * Si es solo una simple cuestion de mostrar el elemento transcluded como tal,
    usa la directiva ng-transclude en tu propio template.
  * Necesitamos generar multiples copias del template y su comportamiento,
    variablesy logica de negocio en el scope donde la transclusion se hace? Si
    es así, inyectar la función transclude dentro de nuestra función link.
  * Llama a la función transclude con un nuevo scope opcional (es lo
    recomendado) y la función linking para una instancia. Con la función linking
    añade las funciones y variables que el template necesite.

Al crear directivas para tareas como carruseles o scroll infinito, puedes
considerar  usar transclusion para hacer tu vida mas facil.

*/
