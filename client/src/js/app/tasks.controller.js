angular
  .module('toDoList')
  .controller('TasksController', TasksController);

TasksController.$inject = ['$scope','tasksService','$filter'];

function TasksController($scope,tasksService,$filter) {
  var orderBy = $filter('orderBy');
  $scope.tasks = tasksService.tasks;
  $scope.user = userService;

  $scope.addTask = function (){
    tasksService.addTask($scope.taskName,$scope.taskDate);
    $scope.tasks=tasksService.tasks;
    $scope.taskName=undefined;
    $scope.taskDate=undefined;
  }

  $scope.deleteTask = function ($index) {
    tasksService.deleteTask($index);
  }

 $scope.order = function(predicate, reverse) {
   console.log(reverse+" "+predicate);
   console.log($scope.tasks);
   console.log(tasksService.tasks);
   $scope.tasks=orderBy(tasksService.tasks, predicate, reverse);
  };


  $scope.editTaskName = function (event,task) {
    var target=event.target;
    var newTaskName=target.innerText;
    if(newTaskName!=task.taskname){
      if(newTaskName.length){
        task.taskname=newTaskName;
      }else{
        target.innerText=task.taskname;
      }
    }
  }
}
