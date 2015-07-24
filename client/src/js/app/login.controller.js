angular
  .module('toDoList')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope','userService'];

function LoginController($scope,userService) {

    $scope.Login = function () {
      var login = $scope.login;
      var pass = $scope.pass;
      userService.loginUser(login,pass);
  }
}
