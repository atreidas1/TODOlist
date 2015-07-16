angular
  .module('toDoList')
  .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope','$state','userService'];

function RegisterController($scope,$state) {
  $scope.register = function () {
    var login = $scope.login;
    var pass = $scope.pass;
    var repPass = $scope.repPass;
    console.log(login,+" "+pass+' '+repPass);
    $state.go('mytasks');

  }
}
