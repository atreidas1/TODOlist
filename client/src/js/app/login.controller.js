angular
  .module('toDoList')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope',"$state"];

function LoginController($scope, $state) {
  $scope.Login = function () {
    var login = $scope.login;
    var pass = $scope.pass;
    console.log(login, +" " + pass);
    $state.go('mytasks');
  }
}
