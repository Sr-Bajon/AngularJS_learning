/*
  En este ejemplo sobreescribimos el metodo list de ItemService y lo reempazamos
  con nuestro Jasmine Spy.
  La función spyOn devuelve un spy que es llamado con la funcion andReturn
  y devuelve el valor indicado [{id: 1, label: 'Mock'}]
 */
describe('ItemCtrl with SpyReturn', function () {

  beforeEach(module('notesApp1'));

  var ctrl, itemService;

  beforeEach(inject(function ($controller, ItemService) {
    spyOn(ItemService, 'list')
      .andReturn([{id: 1, label: 'Mock'}]);
    // observa que creamos el spy antes del controlador, es lo recomendado
    itemService = ItemService;
    ctrl        = $controller('ItemCtrl');
  }));

  it('should load mocked out items', function () {
    expect(itemService.list).toHaveBeenCalled();
    expect(itemService.list.callCount).toEqual(1);
    expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
  });

});
