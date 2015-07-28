angular
  .module('toDoList', ['ui.router',
                       'ui.bootstrap',
                       'ngResource',
                       'ui.grid',
                       'ui.grid.edit',
                       'ui.grid.selection',]);

angular.module('toDoList').config(routeConf);

function routeConf($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/login');
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller:  'LoginController'
    })
    .state('register', {
      url: "/register",
      templateUrl: 'register.html',
      controller: 'RegisterController'
    })
    .state('mytasks', {
      url: '/mytasks',
      templateUrl: 'ui-grid.html',
      controller: 'TasksController'
    });
}

angular.
  module('toDoList').
  config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
