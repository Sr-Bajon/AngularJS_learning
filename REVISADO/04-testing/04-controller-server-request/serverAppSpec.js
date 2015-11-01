// el controlador a testear hace una llamada al servidor al cargarse, de forma
// que mockeamos esta llamada, al hacerla el controlador recibirá la respuesta
// que hayamos indicado con expectGet.
/*
 hay dos formas de expectation que pueden hacerse con $httpBackend

  expect
    Se usa cuando queremos controlar exactamente cuantas peticiones se hacen y
    a que URLs, y luego controlar la respuesta. La funcion expect tiene una serie
    de funciones, una por cada metodo de HTTP, por ejemplo expectGET o expectPOST.
    El primer argumento de la funcion es la URL y el segundo, opcional, actua como
    el POST data. Asi que expectGET('/api/notes') en el ejemplo previo dice que
    habrá una peticion GET a la URL dada.
    De forma similar, expectPOST('/api/notes', {label: 'Hi'}) le dice al servicio
    que espere una peticion POST con los datos pasados como segundo argumento.

  when
    Similar a expect, toma una URL y opcionalmente datos para el POST. La sintaxis
    es exactamente la misma, la diferencia es que when no se preocupa del orden
    de las peticiones o cuantas veces se hace cada llamada. Simplemente mira la
    peticion y envia la respuesta. Con expect, un test puede fallar si la
    "expectation" no se satisface, con when, incluso si el test nunca realiza
    una llamada, el test pasará.

*/

describe('MainCtrl Server Calls', function () {

  beforeEach(module('serverApp'));

  var ctrl, mockBackend;

  beforeEach(inject(function ($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('/api/note')
      .respond([{id: 1, label: 'Mock'}]);
    ctrl = $controller('MainCtrl');
    // At this point, a server request will have been made
  }));

  it('should load items from server', function () {
    // Initially, before the server responds,
    // the items should be empty
    expect(ctrl.items).toEqual([]);
    // Simulate a server response
    mockBackend.flush();
    expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
  });


  /*
    Como buena practica al usar $httpBackend se añade un afterEach con las
    siguientes funciones
      verifiyNoOutstandingExpectations()
        checkea si lo especificado con $httpBackend no ha sido satisfecho como
        parte de tus test. Asi que si añadimos otro expectation pero el
        controlador nunca hace la llamada al servidor, el test fallará.
      verifyNoOutstandingRequest()
        se asegura que has testeado todos los casos. AngularJS divide todas
        las peticiones en una peticion y una respuesta. Lanzamos las peticiones
        con la función flush(). verifyNoOutstandingRequest se asegura de que
        por cada llamada hecha al servidor, la respuesta se lanza con flush().
        Si no, el test falla.
   */
  afterEach(function () {
    // Ensure that all expects set on the $httpBackend
    // were actually called
    mockBackend.verifyNoOutstandingExpectation();
    // Ensure that all requests to the server
    // have actually responded (using flush())
    mockBackend.verifyNoOutstandingRequest();
  });
});
