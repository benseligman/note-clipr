noteClipr.factory('Notebooks', ['$http', function ($http) {
    return $http.get('/notebooks.json');
  }
]);
