// File: chapter5/simple-angularjs-service/app.js
angular.module('notesApp', [])
  .controller('MainCtrl', [function () {
    var mainCtrl  = this;
    mainCtrl.tab  = 'first';
    mainCtrl.open = function (tab) {
      mainCtrl.tab = tab;
    };
  }])
  .controller('SubCtrl', ['ItemService',
    function (ItemService) {
      var ctrl  = this;
      ctrl.list = function () {
        return ItemService.list();
      };
      ctrl.add  = function () {
        ItemService.add({
          id   : ctrl.list().length + 1,
          label: 'Item ' + ctrl.list().length
        });
      };
    }])
  .factory('ItemService', [function () {
    // esta factoria define variables privadas que solo son accesibles a traves
    // de los metodos definidos en el return (closure)
    var items = [
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'}
    ];
    return {
      list: function () {
        return items;
      },
      add : function (item) {
        items.push(item);
      }
    };
  }]);
