/*
  Todos los filtros pueden ser inyectados en nuestros controladores o servicios
  añadiendo el sufijo "Filter" al final del nombre del filtro
  currencyFilter
  numberFilter
  filterFilter


  Por ejemplo:
 */

angular.module('myModule', [])
  .controller('MyCtrl', ['currencyFilter',
    // inyectamos el filter currency con currencyFilter
    function (currencyFilter) {
      //  Y para usarlo sería
      self.filteredArray = filterFilter(self.notes, 'ch');
    }
  ]);


/*
  Teniendo en cuenta:
  -  El primer argumento del filtro es el valor sobre el que vamos a actuar
  -  El resto de argumentos son los que el filtro necesite, en el orden
      mencionado en la documentacion
  -  El valor de retorno del filtro es el valor resultante de aplicarlo
 */
