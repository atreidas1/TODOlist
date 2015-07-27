angular
  .module('toDoList')
  .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$state', 'userService'];

function RegisterController($scope, $state, userService) {

  $scope.register = function () {
    var login = $scope.login;
    var pass = $scope.pass;
    var repPass = $scope.repPass;
    if (login && (pass && repPass)) {
      var result = userService.registerUser(login, pass, repPass);
      result.$promise.then(function (response) {
        userService.setUser(response.user, response.userId);
      }, function (response) {});
    }
  };

}
