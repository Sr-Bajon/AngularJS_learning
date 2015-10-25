/*
  1. Get the $compile service injected into our test.
  2. Set up our directive instance HTML.
  3. Create and set up our scope with the necessary variables.
  4. Determine the template to load because our server is mocked out.
  5. Instantiate an instance of our directive using the $compile service.
  6. Write our expectations for rendering and behavior.
*/

// File: chapter12/stockDirectiveRenderSpec.js
describe('Stock Widget Directive Rendering', function () {

  beforeEach(module('stockMarketApp'));

  var compile, mockBackend, rootScope;

  // Step 1
  // $compile lo necesitamos para crear instancias de nuestra directiva,
  // $rootScope para ser capaces de crear scopes para testear nuestra directiva,
  // $httpBackend para simular la llamada al servidor para cargar el template
  beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
    compile     = $compile;
    mockBackend = $httpBackend;
    rootScope   = $rootScope;
  }));

  it('should render HTML based on scope correctly', function () {

    // Step 2
    // Creamos el scope con los datos que necesita la directiva
    var scope     = rootScope.$new();
    scope.myStock = {
      name    : 'Best Stock',
      price   : 100,
      previous: 200
    };
    scope.title   = 'the best';

    // Step 3
    // Como nuestra directiva carga el template por URI, y porque no hay
    // servidor en los test unitarios tenemos que crear expectations en
    // $httpBackend para que simule la carga cuando sea llamado.
    // Creamos un string que contiene HTML para satisfacer las necesidades de
    // la directiva.
    mockBackend.expectGET('stock.html').respond(
      '<div ng-bind="stockTitle"></div>' +
      '<div ng-bind="stockData.price"></div>');

    // Step 4
    // Creamos una instancia de la directiva. Primero compilamos el HTML que
    // lanzará nuestra directiva. Esto devuelve una función compilada
    // volvemos a compilarla contra el scope para tenerlo listo.
    var element = compile('<div stock-widget' +
                          ' stock-data="myStock"' +
                          ' stock-title="This is {{title}}"></div>')(scope);

    // Step 5
    // Hacemos digest del scope y flush para que se hagan las peticiones al
    // servidor, esto se hace para decirle a Angular que actualice todos los
    // bindeos en el HTML y se asegura que el HTML que hemos especificado en
    // $httpBackend cargue el HTML y lo renderice para que esté preparado para
    // el resto de nuestros test.
    scope.$digest();
    mockBackend.flush();

    // Step 6
    // En este punto tenemos una instancia completa de nuestra directiva, aqui
    // escribiremos los expectations y los test de renderizado para ver si los
    // datos se toman del scope correctamente y los atributos HTML se pasan
    // correctamente con los datos.
    expect(element.html()).toEqual(
      '<div ng-bind="stockTitle" class="ng-binding">' +
        'This is the best' +
      '</div>' +
      '<div ng-bind="stockData.price" class="ng-binding">' +
        '100' +
      '</div>');
  });
});
