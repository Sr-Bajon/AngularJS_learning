(function () {
  'use strict';

  var app = angular.module('muec', []);

  app.directive("simple", function () {
    return {
      restrict  : "EA",
      transclude: true,
      template  : "<div>{{label}}<div ng-transclude></div></div>",

      compile   : function (element, attributes) {
        /*
          La funcion compile recibe el elemento "simple", asi se llama el elemento,
          como una referncia jqLite. Sería el elemento sin transclusion ni data binding

          Es seguro realizar modificaciones en el DOM pero no event handlers, porque
          como hay mas directivas implicadas el DOM puede cambiar.


         */

        return {
          pre : function (scope, element, attributes, controller, transcludeFn) {
            // aqui tenemos el scope inicializado por el controlador, y una referencia
            // al elemento real que aparecerá en el DOM.
            // No tenemos el contenido transcluded y el template no esta linkado
            // al scope todavia.
            // esta funcion solo es util es ocasiones muy especiales...(investigar esto)
            // por lo que si devolvemos una funcion en la opcion compile se sobreentiende
            // que es la post link function
          },
          post: function (scope, element, attributes, controller, transcludeFn) {
            // Es la ultima funcion que se ejecuta. La transclusion esta completa
            // El template esta linkado al scope y la vista se actualizará con los
            // datos bindeados en el siguiente digest cycle.
            // Aqui se puede manipular el DOM, atar eventos, inspeccionar elementos hijos,
            // establecer watchers en atributos del scope, etc.
          }
        };
      },
      controller: function ($scope) {
        // el orden de ejecucion es controller -> compile -> link  teniendo en cuenta
        // que si hay funcion compile la funcion link será obviada.
        // el controlador tambien recibe el elemento con $element, y a diferencia del
        // elemento en compile, se trata del elemento actual del DOM. Por lo que cualquier
        // cambio que hagamos en él se verá reflejado inmediatamente. No obstante no es
        // buena practica modificar el DOM en el controller, será tarea de la post link
        // function
      },

      link: function(scope, element, attributes){
        // si no necesitamos usar la compile function, que sirve solo para manipular
        // el dom antes de que sea linkado y se procesen otras directivas, normalmente
        // usaremos la link function.
      }
    };
  });


})();


