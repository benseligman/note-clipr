noteClipr.factory('Notes', ['$http', function ($http) {
    return $http.get('/notes.json');
  }
]);
