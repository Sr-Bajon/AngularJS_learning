/*
  La directiva necesita mirar el HTML y hacer lo siguiente:
  * Generar el tag del input correcto con ng-model, y las reglas de validacion
  * Generar el template para todos los mensajes de error y asegurarse que son
    mostrados con la condicion correcta
  * Ignorar los atributos que no se conozcan o manejarlos por la directiva
    correctamente.
  * Añadir funciones al scope para mostrar los mensajes de error correctamente
*/

angular.module('dynamicFormApp')
  .directive('formElement', [function () {
    return {
      restrict: 'E',
      require : '^form',
      scope   : true,
      compile : function ($element, $attrs) {
        var expectedInputAttrs = {
          'required'    : 'required',
          'ng-minlength': 'ngMinlength',
          'ng-pattern'  : 'ngPattern'
          // More here to be implemented
        };

        // Start extracting content from the HTML
        var validationKeys        = $element.find('validation');
        var presentValidationKeys = {};
        var inputName             = $attrs.name;

        angular.forEach(validationKeys, function (validationKey) {
          // vemos que usamos angular.forEach para recorrer el array, estas
          // funciones son utilidades que incorpora angular como por ejemplo
          // angular.fromJson y angular.toJson
          // angular.copy
          // angular.equals
          // angular.isObject, angular.isArray, angular.isFunction
          // angular.isString, angular.isNumber, angular.isDate
          validationKey = angular.element(validationKey);
          presentValidationKeys[validationKey.attr('key')] = validationKey.text();
        });

        // Start generating final element HTML
        var elementHtml = '<div>' +
                          '<label>' + $attrs.label + '</label>';

        elementHtml += '<input type="' + $attrs.type +
                       '" name="' + inputName +
                       '" ng-model="' + $attrs.bindTo + '"';

        $element.removeAttr('type');
        $element.removeAttr('name');

        for (var i in expectedInputAttrs) {
          if ($attrs[expectedInputAttrs[i]] !== undefined) {
            elementHtml += ' ' + i + '="' +
              $attrs[expectedInputAttrs[i]] + '"';
          }
          $element.removeAttr(i);
        }

        elementHtml += '>';
        elementHtml +=
          '<span ng-repeat="(key, text) in validators" ' +
          ' ng-show="hasError(key)"' +
          ' ng-bind="text"></span>';

        elementHtml += '</div>';

        $element.html(elementHtml);

        return function ($scope, $element, $attrs, formCtrl) {
          $scope.validators = angular.copy(presentValidationKeys);
          $scope.hasError   = function (key) {
            return !!formCtrl[inputName]['$error'][key];
          };
        };
      }
    };
  }]);

/*
  1.  Añadimos require apra asegurarnos que la directiva formElement se usa como
      un hijo de un elemento form y tambien un scope nuevo como es lo
      recomendado.
  2.  Le damos una funcion compile, que es llamada con el elemento y sus
      atributos. La funcion compile se ejecuta antes de que el scope esté
      disponible, por lo que no podemos inyectarle el scope.
  3.  Empezamos extrayendo y parseando el elemento form-element del HTML, y
      tomando las reglas de validacion, mensajes y atributos existentes de los
      que nos ocupamos.
  4.  Despues de eso, empezamos a generar un nuevo HTML que será usado en la
      directiva.
      Como añadiremos directivas de AngularJS dinamicamente, debemos hacer esto
      en el compile. Si lo hicieramos en el link stpe, AngularJS no detectaría
      estas directivas y nuestra aplicación no funcionaría.
  5.  Añadimos el tag input con el nombre ng-model y todas las validaciones
      presentes en el HTML.
  6.  Luego reemplazamos el contenido existente de la directiva con su nuevo
      contenido generado.
  7.  Finalmente, devolvemos una función postLink, que añade el array
      validator y tiene una función hasError para mostrar cada mensaje de
      validacion bajo las condiciones correctas.
      Esto usa el controlador del formulario, que es requerido por la directiva
      de forma estandar.

  Usar la funcion compile no es muy normal, solo cuando se necesite hacer
  transformaciones DOM en tiempo de ejecución. En la mayoria de los casos, se
  puede hacer lo mismo con transclusion o funciones link normales. Pero está
  ahi por si nos hace falta.

 */


/*
  Pre and Post linking

  La funcion link que escribimos generalmente (e incluso la que devuelve la
  funcion compile) es lo que se conoce como una función post-link.
  Cuando la función post-link se ejecuta, todas las directivas hijas han sido
  compiladas y linkadas en este punto. Las transformaciones DOM son seguras en
  este punto tambien.

  Pero en caso de que necesitemos que se ejecute algo antes de que los hijos
  se linken, podemos añadir lo que se llama un funcion pre-link. En este punto,
  las directivas hijas no estan linkadas, y las transformaciones DOM no son
  seguras y pueden tener efectos extraños.

  La forma de tener pre y post-link functions es definirlas como un objeto en
  vez de una funcion. En vez de:

    {
      link: function($scope, $element, $attrs) {}
    }

  Tenemos:

  {
    link: {
      pre:  function($scope, $element, $attrs) {},
      post: function($scope, $element, $attrs) {}
    }
  }


  Esto es cierto tambien para el return de la funcion compile, donde en vez de
  devolver una funcion, podemos devolver un objeto con claves pre y post.
 */
