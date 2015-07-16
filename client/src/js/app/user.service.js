angular
  .module('toDoList')
  .service('userService', userService);

function userService() {
  this.user={};
  this.setUser=setUser;
  this.removeUser=removeUser;

  return this;

  function removeUser(){
    this.user=undefined;
  }

  function setUser(user){
    this.user=user;
  }
}
