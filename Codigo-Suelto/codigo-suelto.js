// Definimos un modulo, el segundo argumento es un array de nombres de modulos
// de los que depende el modulo. En este caso se crea sin dependencias
angular.module('notesApp', []);


// Otro ejemplo pero esta vez si definimos modulos de los que depende
angular.module('notesApp',
  ['notesApp.ui', 'thirdCompany.fusioncharts']);

// Para cargar un modulo ya definido en otro archivo.
// Cuidado de que se haya cargado el modulo previamente a llamarlo.
angular.module('notesApp');

// ng-app admite un segundo argumento, el nombre de un modulo
<html ng-app="notesApp">

// ejemplo de inyeccion de dependencias
// $location permite acceder a los parametros de la URL
function HelloController($scope, $location) {
  $scope.greeting = { text: 'Hello' };
  // use $location for something good here...
}

// CDN de google
// https://developers.google.com/speed/libraries/
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>



/*
  ng-cloack

AngularJS has a directive called ng-cloak , which is a mechanism to hide sections of the
page while AngularJS bootstraps and finishes loading. ng-cloak uses the following CSS
rules, which are automatically included when you load angular.js or angular.min.js:
  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
  }
After this, any section or element that needs to be hidden in your HTML needs to have
class="ng-cloak" added to it. This applies the preceding CSS and hides the element
by default. After AngularJS finishes loading, it goes through your HTML and removes
ng-cloak from all these elements, thus ensuring that your UI is shown after AngularJS
has finished bootstrapping.

You can apply ng-cloak on the body tag, but it is often better to add it on smaller sections
so that your application can load progressively instead of all at once.

Do note that the ng-cloak styling is loaded as part of the angular.js source code. So if
you load your AngularJS library at the very end of your HTML (as you should), the style
will not be applied to the HTML until AngularJS has finished loading. Thus it is often
a good idea to include the preceding CSS as part of your own CSS to ensure it is loaded
upfront before your HTML starts displaying.

 */
