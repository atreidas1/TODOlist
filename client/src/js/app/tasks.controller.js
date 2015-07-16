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


  $scope.editTaskname = function (task, event) {
    var newTaskName = event.target.textContent;
    console.log(newTaskName.length);
    if (task.taskname != newTaskName && newTaskName.length != 0) {
      task.taskname = newTaskName;
    } else {
      event.target.textContent = task.taskname;
    }
  }
}
