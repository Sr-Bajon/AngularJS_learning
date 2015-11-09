// File: chapter5/need-for-service/app.js
angular.module('notesApp', [])
  .controller('MainCtrl', [function () {
    var mainCtrl  = this;
    mainCtrl.tab  = 'first';
    mainCtrl.open = function (tab) {
      mainCtrl.tab = tab;
    };
  }])
  .controller('SubCtrl', [function () {
    var ctrl  = this;
    ctrl.list = [
      {id: 1, label: 'Item 0'},
      {id: 2, label: 'Item 1'}
    ];
    ctrl.add  = function () {
      ctrl.list.push({
        id   : ctrl.list.length + 1,
        label: 'Item ' + ctrl.list.length
      });
    };
  }]);
