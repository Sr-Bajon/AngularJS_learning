/*
  Objetivos de la directiva.
    - Hacer nuestra intención declarativa en el html
    - Hacer algo reusable
    - Que sea una caja negra, idealmente que se pueda cambiar la implementacion
      sin que sea necesario cambiar el uso que le hayamos dado anteriormente

  Vamos a seguir el ejemplo de ng-include para hacerlo una directiva, queremos
  que tenga la forma de:

      <div stock-widget></div>

  Se usa la sintaxis de siempre, con la inyeccion de dependencias y todo igual,
  solo que esta vez se trata de un directiva.
  El nombre de la directiva será en camel-case, y el nombre de la directiva en
  el html será en minusculas y cada palabra del camel case separada por un guion

    stockWidget   =>    stock-widget

  En este ejemplo de declarar una directiva, solo podemos usarla como atributo
  de otro elemento html, no como elemente por si mismo.

    <div stock-widget>    y no  <stock-widget>
 */

angular.module('stockMarketApp', [])
  .directive('stockWidget', [function () {
    return {
      // Directive definition will go here
    };
  }]);


// La primera opcion que podemos definir en una directiva es que contenido
// necesita ser insertado cuando se encuentre la directiva. Hacemos esto usando
// las opciones template y templateUrl, similares a las de routing

//app.js
angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var self       = this;
    self.stocks    = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];
    self.getChange = function (stock) {
      return Math.ceil((
        (stock.price - stock.previous) / stock.previous) * 100);
    };
  }]);


// stock.html
/*
<div class="stock-dash">
  Name:
  <span class="stock-name"
    ng-bind="stock.name">
  </span>
  Price:
  <span class="stock-price"
    ng-bind="stock.price | currency">
  </span>
  Percentage Change:
  <span class="stock-change"
    ng-bind="mainCtrl.getChange(stock) + '%'">
  </span>
</div>
*/

// index.html
/*
<html>
<head>
  <title>Stock Market App</title>
</head>
<body ng-app="stockMarketApp">
<div ng-controller="MainCtrl as mainCtrl">
  <h3>List of Stocks</h3>

  <div ng-repeat="stock in mainCtrl.stocks">
    <div stock-widget>
    </div>
  </div>
</div>
<script src="http://code.angularjs.org/1.2.16/angular.js"></script>
<script src="app.js"></script>
<script src="directive.js"></script>
</body>
</html>
*/


// directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html'
    };
  }]);
// la definicion de la directiva es muy simple, simplemente declaramos que cada
// vez que encuentre la directiva stock-widget en el html lo sustituya por el
// contenido del archivo html, stock.html

// otra cosa a tener en cuenta es que stock.html se cacheará despues del primer
// uso y los subsiguientes harán uso de la caché


// si nuestro template es suficientemente pequeño podemos optar por la opcion
// de crearlo inline con la opcion template de la directiva.
// la declaracion de directiva siguiente es exactamente igual que la anterior
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      template: '<div class="stock-dash">' +
      'Name: ' +
      '<span class="stock-name"' +
        'ng-bind="stock.name">' +
      '</span>' +
      'Price: ' +
      '<span class="stock-price"' +
        'ng-bind="stock.price | currency">' +
      '</span>' +
      'Change: ' +
      '<span class="stock-change"' +
        'ng-bind="mainCtrl.getChange(stock) + ' % '">' +
      '</span>' +
      '</div>'
    };
  }]);


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


/*
  Link Function:
    La palabra reservada link de la definicion de la directiva se usa para
    crear una link function en la directiva.

    La link function hace para la directiva lo que el controlador hace por la
    vista, define los APIs y funciones necesarios para esa directiva.

    AngularJS ejecuta la función link por cada instancia de la directiva asi que
    cada directiva tiene sus propio ambito y no se verá afectada por el uso de
    otras instancias de la misma directiva.

      link: function($scope, $element, $attrs) {}

    A la funcion link se le pasa el $scope del elemento en el que esta
    trabajando la directiva, el HTML DOM del elemento y todos los atributos
    del elemento como strings. Si queremos añadir funcionalidad podemos añadirlo
    al $scope del elemento.

    Siguiendo el ejemplo, moveremos la funcionalidad de mainCtrl a nuestra
    directiva.
 */
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'AE',
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
      }
    };
  }]);

// y para usarlo en stock.html
/*
<div class="stock-dash">
  Name:
<span class="stock-name"
      ng-bind="stock.name">
</span>
  Price:
<span class="stock-price"
      ng-bind="stock.price | currency">
</span>
  Percentage Change:
<span class="stock-change"
      ng-bind="getChange(stock) + '%'">
</span>
</div>
*/
// lo unico que ha cambiado es que en vez de llamar a mainCtrl.getChange(stock)
// llamamos directamente a getChange(stock), lo que implica que esta funcion
// esta en nuestro propip $scope. Ahora nuestra directiva es independiente de
// que el controlador tenga una función getChange, se ha vuelto independiente.
// En la link function tb podemos definir listeners, trabajar directamente con
// el elemento DOM y mucho mas.


/*
  Scope
    Por defecto, cada directiva hereda el scope del padre, que se le pasa a la
    funcion link. Esto puede traer problemas:
    * Añadir variables y funciones al scope modifica el del padre tambien, que
      de pronto puede acceder a mas variables y funciones.
    * La directiva puede sobreescribir variables y funciones con el mismo nombre
      sin querer
    * La directiva puede usar variables y funciones del padre, lo cual es mala
      practica pues ya no sería reusable.

  Tenemos la palabra reservada scope en la definicion de la directiva, y puede
  aceptar los siguientes valores:
    false   El valor por defecto, que le dice a Angular que el scope de la
            directiva es el mismo que el del padre.
            Las modificaciones en el scope estarán disponibles en la directiva
            y en el padre.
    true    Le dice a Angular que el scope hereda del padre, pero crea una
            child scope para si misma.
            La directiva sigue teniendo acceso a las variables y funciones del
            padre, pero las modificaciones que se hagan en el scope de la
            directiva no estan disponibles en el padre.
    object  Podemos pasar un objeto con claves y valores al scope. Esto le dice
            a Angular que cree lo que llamamos un isolated scope.
            Este scope no hereda de nadie, todos los atributos que haya que
            pasarle a esta directiva han de ser mediante atributos HTML.
            Es la mejor opcion cuando creamos componentes reutilizables que
            deben ser independientes de como y donde son usados.

            En el objeto, podemos identificar que atributos deben ser
            especificados en el HTML cuando se use la directiva, y los tipos de
            valores que serán pasados a la directiva.
            En particular, podemos especificar tres tipos posibles de valores,
            los cuales AngularJS pondrá directamente en el scope de la directiva.

            =   Especifica que el valor del atributo HTML será tratado como
                un objeto JSON. El atributo estará atado a la directiva por lo
                que cualquier cambio en él estará disponible en la directiva.
            @   El valor del atributo HTML será tratado como un string, que
                puede tener o no expresiones AngularJS {{}}.
                Cualquier cambio en el valor estará disponible en la directiva.
            &   Especifica que el valor del atributo es una función en algun
                controlador cuya referencia necesita estar disponible en la
                directiva.
                La directiva puede utilizar la función cuando la necesite.
 */

// En nuestro ejemplo ahora le pasaremos el stock object a nuestro widget, de
// esta forma si la variable se renombra desde fuera, la nueva variable se le
// pasará a nuestra directiva, haciendola independiente del nombre.

//index.html
/*
<html>
<head>
  <title>Stock Market App</title>
</head>
<body ng-app="stockMarketApp">
<div ng-controller="MainCtrl as mainCtrl">
  <h3>List of Stocks</h3>

  <div ng-repeat="s in mainCtrl.stocks">
    <div stock-widget stock-data="s">
    </div>
  </div>
</div>
<script src="http://code.angularjs.org/1.2.16/angular.js"></script>
<script src="app.js"></script>
<script src="directive.js"></script>
</body>
</html>
 */

// vemos que el html es igual pero hemos añadido un atributo stock-data="s"
// donde "s" es el nombre que le hemos dado a la variable en ng-repeat

angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData: '='
        // AngularJS crea una variable llamada stockData
        // En el HTML, el valor de stockData se puede setear usando el atributo
        //  stock-data
        // El valor de stockData se ata al objeto al que el atributo HTML
        // stock-data apunta, cualquier cambio en el valor se refleja
        // inmediatamente en el scope de la directiva
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
      }
    };
  }]);

// stock.html
/*
<div class="stock-dash">
  Name:
<span class="stock-name"
      ng-bind="stockData.name">
</span>
  Price:
<span class="stock-price"
      ng-bind="stockData.price | currency">
</span>
  Percentage Change:
<span class="stock-change"
      ng-bind="getChange(stockData) + '%'">
</span>
</div>
*/
// en el html de la directiva todas las referencias a la variable stock del
// padre han sido reemplazadas por los datos de la directiva, stockData.

// cuando pasamos datos usando el object binding a las directivas, lo estamos
// haciendo por referencia, por lo que si reasignamos la variable en la
// directiva romperemos el data-binding de AngularJS. Veamos un ejemplo de esto

// app.js
angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var self              = this;
    self.stocks           = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];

    self.changeAllStocks  = function () {
      for (var i = 0; i < 4; i++) {
        self.stocks[i] = {
          name    : 'Controller Stock',
          price   : 200,
          previous: 250
        };
      }
    };
    self.changeFirstStock = function () {
      self.stocks[0].name = 'Changed First Stock';
    };
  }]);

// en el html añadimos dos botones que lanzan las dos funciones del controlador

// index.html
/*
<html>
<head>
  <title>Stock Market App</title>
</head>
<body ng-app="stockMarketApp">
<div ng-controller="MainCtrl as mainCtrl">
  <h3>List of Stocks</h3>

  <div ng-repeat="s in mainCtrl.stocks">
    <div stock-widget stock-data="s">
    </div>
  </div>
  <button ng-click="mainCtrl.changeAllStocks()">
    Change All Stock From Controller
  </button>
  <button ng-click="mainCtrl.changeFirstStock()">
    Change First Stock From Controller
  </button>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.js">
</script>
<script src="app.js"></script>
<script src="directive.js"></script>
</body>
</html>
*/

// directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData: '='
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange   = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
        $scope.changeStock = function () {
          $scope.stockData = {
            name    : 'Directive Stock',
            price   : 500,
            previous: 200
          };
        };
      }
    };
  }]);
// en la directiva añadimos una función similar que cambia el stock actual tb

// stock.html
/*
<div class="stock-dash">
  Name:
<span class="stock-name"
      ng-bind="stockData.name">
</span>
  Price:
<span class="stock-price"
      ng-bind="stockData.price | currency">
</span>
  Percentage Change:
<span class="stock-change"
      ng-bind="getChange(stockData) + '%'">
</span>
  <button ng-click="changeStock()">
    Change Stock in Directive
  </button>
</div>
*/
// en nuestro partial llamamos a la funcion changeStock
// vemos que las cosas no funcionan de la forma esperada, esto pasa porque hemos
// reasignado $scope.stockData en nuestra directiva
// Inicialmente $scope.stockData apuntaba a R1, despues lo reasignamos y ahora
// apunta a R2, por lo que no funciona como esperabamos.


// ahora vamos a modificar la directiva para usar los otros dos tipos de
// atributos en el scope.

//app.js
angular.module('stockMarketApp', [])
  .controller('MainCtrl', [function () {
    var self           = this;
    self.stocks        = [
      {name: 'First Stock', price: 100, previous: 220},
      {name: 'Second Stock', price: 140, previous: 120},
      {name: 'Third Stock', price: 110, previous: 110},
      {name: 'Fourth Stock', price: 400, previous: 420}
    ];
    self.onStockSelect = function (price, name) {
      console.log('Selected Price ', price, 'Name ', name);
    };
  }]);

// index.html
/*
<html>
<head>
  <title>Stock Market App</title>
</head>
<body ng-app="stockMarketApp">
<div ng-controller="MainCtrl as mainCtrl">
  <h3>List of Stocks</h3>

  <div ng-repeat="s in mainCtrl.stocks">
    <div stock-widget
         stock-data="s"
         stock-title="Stock {{$index}}. {{s.name}}"
         when-select="mainCtrl.onStockSelect(stockPrice, stockName)">
    </div>
  </div>
</div>
<script src="http://code.angularjs.org/1.2.16/angular.js"></script>
<script src="app.js"></script>
<script src="directive.js"></script>
</body>
</html>
*/
// en el index.html ha cambiado la forma en que usamos nuestra directiva, ahora
// le pasamos tb un titulo y una función.
// observar que en las directivas como ng-bind o ng-show si le pasamos una
// funcion como miFuncion() lo que hacen es llamarla, pero si la ponemos en un
// atributo lo que hace Angular es pasarla como referencia y no llamarla, de
// forma que podemos ejecutarla en nuestra directiva.

// stock.html
/*
<div class="stock-dash">
  Name:
<span class="stock-name"
      ng-bind="stockTitle">
</span>
  Price:
<span class="stock-price"
      ng-bind="stockData.price | currency">
</span>
  Percentage Change:
<span class="stock-change"
      ng-bind="getChange(stockData) + '%'">
</span>
  <button ng-click="onSelect()">Select me</button>
</div>
*/
// stock ha cambiado poco, añadimos un boton y en el titulo ahora usamos
// stocktTitle

// directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function () {
    return {
      templateUrl: 'stock.html',
      restrict   : 'A',
      scope      : {
        stockData : '=',
        stockTitle: '@',
        whenSelect: '&'
      },
      link       : function ($scope, $element, $attrs) {
        $scope.getChange = function (stock) {
          return Math.ceil(((stock.price - stock.previous) /
            stock.previous) * 100);
        };
        $scope.onSelect  = function () {
          $scope.whenSelect({
            stockName    : $scope.stockData.name,
            stockPrice   : $scope.stockData.price,
            stockPrevious: $scope.stockData.previous
          });
        };
      }
    };
  }]);
// scope tiene ahora dos atributos mas, stockTitle de tipo @, por lo que se pasa
// como string y queda bindeado con Angular.
// tb hemos añadido a scope whenSelect de tipo &, lo que permite ejecutar la
// funcion cuando queramos.
// finalmente se añade la función onSelect en la link function, para cuando el
// user haga click en el boton

/*
  nos surge el problema de que la función que se ha pasado tiene tres
  parametros que deben ser satisfechos, si no proporcionamos alguno la funcion
  falla, esto hace podo reusable nuestra directiva pues la función se podría
  implementar de varias formas. Para solventar esto:
   * Cada directiva al ejecutar la función puede definir varios parametros que
     estan disponibles en el controlador
   * Cada controlador puede entonces dedicir cual de estos parametros usa
   * El controlador puede decidir el orden y numero de parametros que quiere
     de la directiva.

  De esta forma, el controlador puede pedir lo que quiera, en el orden que .
  quiera
  La directiva puede conseguir esto pasando un objeto a la función que se le ha
  pasado. En este objeto, cada clave dicta un parametro que el contrador pide,
  y el valor asignado a esa clave es el valor que el controlador recibe cuando
  pregunta por una clave particular.
  En el ejemplo previo, la función whenSelect se llama con un objeto con tres
  claves:
    stockName
    stockPrice
    stockPrevious
  Y sus valores corresponden a los valores individuales de stock. Nuestro
  controlador decide entonces que solo se preocupa de stockPrice y stockName,
  en ese orden, especificandolo en el HTML en ese orden, con esas claves.
  AngularJS entonces inyectará esos valores en el orden que el controlador ha
  pedido. Nuestro controlador decide ignorar stockPrevious, mientras otro
  controlador puede pedir stockPrevious e ignorar el resto.

  Podemos entonces definir un set de parametros que cada controlador puede pedir
  como parte de la funcion que se le pasa a la directiva.
*/


/*
  Replace
    En todos los casos anteriores, cuando AngularJS encuentra nuestra directiva
    coge el HTML de la directiva y lo inserta como hijo del elemento en el que
    se encuentra.

    En algunos casos, no queremos que el elemento permanezca y lo que queremos
    es que sea reemplazado por el HTML de la directiva.

    Para estos casos existe el atributo replace que toma un valor boolean, que
    por defecto es false. Si lo establecemos a true el elemento será sustituido
    y todos los atributos y clases existentes en el elemento pasan del antiguo
    al nuevo.

    Se planea eliminar este atributo, y probablemente ya se ha hecho, asi que
    no usarlo.
 */

