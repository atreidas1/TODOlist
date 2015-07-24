angular
  .module('toDoList')
  .service('userService', userService);

userService.$inject = ['$resource','tasksService'];

function userService($resource,tasksService) {
  var serv = this;
  serv.user = undefined;
  serv.setUser = setUser;
  serv.removeUser = removeUser;
  serv.registerController = registerController;
  serv.loginUser = loginUser;
  serv.logoutUser = logoutUser;
  serv.registerUser = registerUser;
  serv.notifyControllers = notifyControllers;
  serv.controllers = [];
  serv.loginResource = $resource('/api/v1/auth/login/');
  serv.logoutResource = $resource('/api/v1/auth/logout/');
  serv.registerResource = $resource('/api/v1/register/');

  return this;

  function registerUser(login, password, rePass) {
    serv.registerResource.save({}, {
      username: login,
      password: password,
      repeatpassword: rePass,
    }, function (response) {
         serv.setUser(response.user,response.userId);
         console.log(response);
    }, function (response) {
         answer = response;
    });
  }

  function loginUser(login, password) {
    var answer = {}
    serv.loginResource.save({}, {
      username: login,
      password: password
    }, function (response) {
      serv.setUser(response.user,response.userId);
    }, function (response) {

    });
    return answer;
  }

  function logoutUser() {
    serv.logoutResource.get(
      function (response) {
        serv.removeUser();
        serv.notifyControllers();
        tasksService.tasks=[];
      },
      function (response) {

      });
  }

  function removeUser() {
    serv.user = undefined;
  }

  function setUser(login,id) {
    serv.user = {}
    serv.user.login = login;
    tasksService.userUri='/api/v1/user/'+id+'/';
    console.log(serv.user)
    serv.notifyControllers();
  }

  function notifyControllers() {
    for (var i = 0; i < serv.controllers.length; i++) {
      serv.controllers[i].update(serv.user);
    }
  }

  function registerController(controller) {
    serv.controllers.push(controller);
  }

}
