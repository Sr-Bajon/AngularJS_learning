angular.module('googleChartApp', [])
  .controller('MainCtrl', [function () {
    var mainCtrl            = this;

    mainCtrl.pieChartData   = [
      {label: 'First', value: 25},
      {label: 'Second', value: 54},
      {label: 'Third', value: 75}
    ];

    mainCtrl.pieChartConfig = {
      title             : 'One Two Three Chart',
      firstColumnHeader : 'Counter',
      secondColumnHeader: 'Actual Value'
    };

    mainCtrl.changeData     = function () {
      mainCtrl.pieChartData[1].value = 25;
    };
  }]);
