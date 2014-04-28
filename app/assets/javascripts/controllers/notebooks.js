noteClipr.controller('NotebooksCtrl', ['$scope', 'Notebooks', function ($scope, Notebooks) {
    Notebooks.success(function (notebooks) {
      $scope.notebooks = notebooks;
    });
  }
]);
