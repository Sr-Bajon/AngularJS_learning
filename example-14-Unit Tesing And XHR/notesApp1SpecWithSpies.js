/*
  Que pasa si no queremos mockear el servicio, si solo queremos llamar a una
  función del servicio y no preocuparnos por el valor que devuelve?

  Para ello usamos un Jasmine Spies. Los espias nos permiten capturar ciertas
  funciones y checkear cuando son llamadas, cuantas veces son llamadas, con
  que argumentos se las llama, etc
 */

describe('ItemCtrl with spies', function () {

  beforeEach(module('notesApp1'));

  var ctrl, itemService;

  beforeEach(inject(function ($controller, ItemService) {
    // llamamos a spyOn con un objeto como primer argumento, y un string con el
    // nombre de la funcion que queremos observar como segundo argumento.
    // En el ejemplo le decimos a Jasmine que espie la funcion list de
    // ItemService.
    spyOn(ItemService, 'list').andCallThrough();
    itemService = ItemService;
    ctrl        = $controller('ItemCtrl');
  }));

  it('should load mocked out items', function () {
    expect(itemService.list).toHaveBeenCalled();
    expect(itemService.list.callCount).toEqual(1);
    expect(ctrl.items).toEqual([
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'}
    ]);
  });

});
