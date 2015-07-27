angular
  .module('toDoList')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', 'userService'];

function LoginController($scope, userService) {

  $scope.Login = function () {
    var login = $scope.login;
    var pass = $scope.pass;
    var res = userService.loginUser(login, pass);

    res.$promise.then(function (response) {
        userService.setUser(response.user,response.userId);
        userService.notifyControllers();
      },
      function (response) {
      });
  };
}
