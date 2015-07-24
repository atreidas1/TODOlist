angular
  .module('toDoList', ['ui.router',
                       'ui.bootstrap',
                       'ngResource']);

angular.module('toDoList').config(routeConf);

function routeConf($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller:  'LoginController as Ctrl'
    })
    .state('register', {
      url: "/register",
      templateUrl: 'register.html',
      controller: 'RegisterController as Ctrl'
    })
    .state('mytasks', {
      url: '/mytasks',
      templateUrl: 'main.html',
      controller: 'TasksController as Ctrl'
    });
}

angular.module('toDoList').config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
