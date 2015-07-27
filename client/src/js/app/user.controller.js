angular
  .module('toDoList')
  .controller('UserController', UserController);

UserController.$inject = ['$scope', '$state', 'userService'];

function UserController($scope, $state, userService) {
  this.update = update;
  userService.registerController(this);
  userService.loginUser('','').$promise.then(function(response){
    userService.setUser(response.user,response.userId);
  },function(response){
      $scope.user = undefined;
      $state.go('login');
  });

  function update() {
    if (userService.user) {
      $scope.user = userService.user;
      $state.go('mytasks');
    } else {
      $scope.user = undefined;
      $state.go('login');
    }
  }

  $scope.logout = function () {
    userService.logoutUser();
  };
}
