// File: pieChart.js
angular.module('googleChartApp')
  .directive('pieChart', ['googleChartLoaderPromise',
    function (googleChartLoaderPromise) {

      var convertToPieChartDataTableFormat =
            function (firstColumnName, secondColumnName, data) {
              var pieChartArray = [[firstColumnName, secondColumnName]];
              for (var i = 0; i < data.length; i++) {
                pieChartArray.push([data[i].label, data[i].value]);
              }
              return google.visualization.arrayToDataTable(
                pieChartArray);
            };

      return {
        restrict: 'A',
        scope   : {
          chartData  : '=',
          chartConfig: '='
        },
        link    : function ($scope, $element) {

          googleChartLoaderPromise.then(function () {
            // al concatenar la promesa nos aseguramos que se ha cargado la
            // libreria asincrona antes de trabajar con ella.
            var chart = new google.visualization.PieChart(
              $element[0]);

            $scope.$watch('chartData', function (newVal, oldVal) {
              var config = $scope.chartConfig;
              if (newVal) {
                chart.draw(
                  convertToPieChartDataTableFormat(
                    config.firstColumnHeader,
                    config.secondColumnHeader,
                    newVal),
                  {title: $scope.chartConfig.title});
              }
            }, true);
          });
        }
      };
    }]);

/*
  Si ignoramos las llamadas especificas de Google Chart no es tan dificil:

  1.  Nuestra directiva pieChart depende del servicio googleChartLoaderPromise,
      así que lo inyectamos.
  2.  Definimos una función, convertToPieChartDataTableFormat, que toma los
      datos que tenemos en nuestro controlador y los convierte en el formato que
      espera la API de Google Charts.
  3.  Definimos una directiva con un scope aislado que define los atributos que
      se le necesita pasar.
  4.  En nuestra funcion link, usamos la promesa devuelta por el servicio, y
      hacemos nuestro trabajo en el manejador de success dentro del .then de la
      promesa.
  5.  Dentro del manejador success de la promesa, creamos una instancia de
      Google Pie Chart, usando el elemento sobre el que esta la directiva.
      Esto asegura que no andamos buscando por un elemento aleatorio de nuestro
      body, o usamos un selector basado en la ID, cada uno de los cuales podría
      hacer nuestra directiva dificil de usar.
  6.  Entonces añadimos un watch en el campo chartData del scope, y le damos una
      funcion para llamar como segundo argumento, y el Boolean true como tercer
      argumento. Esto le dice a AngularJS que haga lo que podriamos llamar una
      busqueda profunda en $scope.chartData, y cuando cambie, o un elemento
      dentro del el cambie, llame a la función.
  7.  La funcion change es llamada con ambos, el antiguo y el nuevo valor.
      Cuando tenemos un nuevo valor validoa, pintamos el grafico despues de
      convertir los datos al formato adecuado.
  8.  Cuando los datos en AngularJS cambien, esta funcion es automaticamente
      llamada, así que no tenemos que hacer manualmente cualquier otro trabajo
      para mantener nuestro grafico actualizado.


      Estos pasos sirven para cualquier otra directiva orientada a mostrar algo
      * Esperar a la API para cargarla.
      * Pasar los datos a una directiva reusable.
      * Convertir los datos al formato necesario y hacer el pintado inicial.
      * Watching the data, y actualizar la UI cuando sea necesario.

 */
