angular
  .module('toDoList')
  .controller('UserController', UserController);

UserController.$inject = ['$scope', '$state', 'userService'];

function UserController($scope, $state, userService) {
  this.update = update;
  userService.registerController(this);
  userService.loginUser('','');

  function update() {
    if (userService.user) {
      sessionStorage.user = userService.user.login;
      $scope.user = userService.user;
      $state.go('mytasks');
    } else {
      $scope.user = undefined;
      $state.go('login');
    }
  }

  $scope.logout = function () {
    userService.logoutUser();
  }
}
