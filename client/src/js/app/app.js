angular
  .module('toDoList', ['ui.router']);

angular.module('toDoList').config(conf);

function conf($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'signIn.html',
      controller: 'LoginController'
    })
    .state('register', {
      url: "/register",
      templateUrl: 'register.html',
      controller: 'RegisterController'
    })
    .state('mytasks', {
      url: '/mytasks',
      templateUrl: 'main.html',
      controller: 'TasksController'
    });
}
