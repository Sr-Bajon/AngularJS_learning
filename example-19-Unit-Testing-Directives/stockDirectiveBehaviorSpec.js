/*
  Ahora vamos a testear la logica y el comportamiento de la directiva.
 */

describe('Stock Widget Directive Behavior', function () {
  beforeEach(module('stockMarketApp'));
  var compile, mockBackend, rootScope;

  // Step 1
  beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
    compile     = $compile;
    mockBackend = $httpBackend;
    rootScope   = $rootScope;
  }));

  it('should have functions and data on scope correctly',
    function () {

      // Step 2
      var scope            = rootScope.$new();
      var scopeClickCalled = '';
      scope.myStock        = {
        name    : 'Best Stock',
        price   : 100,
        previous: 200
      };
      scope.title          = 'the best';
      scope.userClick      = function (stockPrice,
                                       stockPrevious,
                                       stockName) {
        scopeClickCalled = stockPrice +
                            ';' + stockPrevious +
                            ';' + stockName;
      };

      // Step 3
      mockBackend.expectGET('stock.html').respond(
        '<div ng-bind="stockTitle"></div>' +
        '<div ng-bind="stockData.price"></div>');

      // Step 4
      var element = compile(
        '<div stock-widget' +
          ' stock-data="myStock"' +
          ' stock-title="This is {{title}}"' +
          ' when-select="userClick(stockPrice, ' +
          'stockPrevious, stockName)">' +
        '</div>'
      )(scope);

      // Step 5
      scope.$digest();
      mockBackend.flush();

      // Step 6
      // element contiene nuestra directiva
      // usamos el metodo isolatedScope() que es dirente de element.scope() que
      // nos da el scope del padre si es llamado en un elemento con directiva.
      // Despues chequeamos que el elemento tiene el correcto stock data es su
      // propio scope
      // por ultimo comprobamos que la función getChange funciona correctamente
      var compiledElementScope = element.isolateScope();
      expect(compiledElementScope.stockData)
        .toEqual(scope.myStock);
      expect(compiledElementScope.getChange(
        compiledElementScope.stockData)).toEqual(-50);

      // Step 7
      // Comprobamos la función callback. Tenemos una variable definida en
      // nuestro test, el cual es inicialmente asignado a vacio.
      // usamos esta variable como un log de lo ocurrido en el test.
      // Lanzamos la función onSelect de la directiva (tambien podriamos
      // haberla lanzado desde la UI, si nuestro HTML renderizado tuviera un
      // boton). La función onSelect lanza la función userClick que setea la
      // variable string
      // Por ultimo comprobamos que ha sido llamada con los valores adecuados
      expect(scopeClickCalled).toEqual('');
      compiledElementScope.onSelect();
      expect(scopeClickCalled).toEqual('100;200;Best Stock');
    });
});

