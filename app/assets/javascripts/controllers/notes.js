noteClipr.controller('NotesCtrl', ['$scope', 'Notes', function ($scope, Notes) {
    Notes.success(function (notes) {
      $scope.notes = notes;
    });
  }
]);
