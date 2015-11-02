/*
  Restrict:
    Esta palabra clave define como va a usarse la directiva.
    - A   La letra A es el valor por defecto, la directiva se usará como
          atributo de otro elemento html, por ejemplo

            <div stock-widget></div>
    - E   La directiva puede usarse como un nuevo elemento html

            <stock-widget></stock-widget>

    - C   La directiva puede usarse como un nombre de clase en un elemento HTML
          existente

            <div class="stock-widget"></div>

    - M   La directiva puede usarse como comentario HTML.

            <!-- directive: stock-widget -->

          Era necesaria para directiva que necesitaran englobar multiples
          elementos, como multiples columnas de tabla, etc.

          Las directivas ng-repeat-start y ng-repeat-end fueron introducizas
          para este proposito, asi que es mejor usarlas que el tipo directiva
          comentario.


  Las opciones de restrict se pueden usar en solitario o en combinación con
  otras, en el siguiente ejemplo la directiva se puede usar como atributo o como
  elemento por si mismo.
*/
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'AE'
    };
  }]);

/*
  * IE8 y anteriores no soportan los elementos HTML personalizados.
  * Class-based directives son ideales para trabajos de renderización, como
    ocultar y mostrar elementos o cargar imagenes.
  * Element directives se recomiendan si estamos creando nuevo contenido HTML
  * Attribute directives se preferieren cuando estamos creando modificadores de
    comportamiento, como ng-show, ng-class, etc.
 */
