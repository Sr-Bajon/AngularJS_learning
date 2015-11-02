// queremos mockear la factoria ItemService creada en notesApp1.js
// hay dos formas de hacerlo, la primera es sobreescribir el servicio durante
// la ejecución del test unitario

describe('ItemCtrl with inline mock', function () {

  beforeEach(module('notesApp1'));

  var ctrl, mockService;

  // observa que mockeamos el servicio ItemService despues de llamar al modulo
  // notesApp1, esto es asi para que podamos sobreescribir el servicio.
  beforeEach(module(function ($provide) {
    // creamos un mock de la funcionalidad de nuestro servicio
    mockService = {
      list: function () {
        return [{id: 1, label: 'Mock'}];
      }
    };
    $provide.value('ItemService', mockService);
  }));

  beforeEach(inject(function ($controller) {
    ctrl = $controller('ItemCtrl');
  }));

  it('should load mocked out items', function () {
    // ctrl.items llama a ItemService.list, en el test unitario llamará a
    // nuestro servicio mockeado, pues es el que le inyectamos en el beforeEach
    expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
  });

});
