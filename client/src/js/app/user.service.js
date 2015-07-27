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
  serv.authResource = $resource('/api/v1/auth/:action/',{action: '@action'});
  serv.registerResource = $resource('/api/v1/register/');

  return this;

  function registerUser(login, password, rePass) {
    return serv.registerResource.save({}, {
      username: login,
      password: password,
      repeatpassword: rePass,
    });
  }

  function loginUser(login, password) {
    var result=serv.authResource.save({action:'login'}, {username: login,password: password});
    return result;
  }

  function logoutUser() {
    serv.authResource.get({action:'logout'},
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
    serv.user = {};
    serv.user.login = login;
    tasksService.userUri='/api/v1/user/'+id+'/';
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
