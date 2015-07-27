angular
  .module('toDoList')
  .controller('TasksController', TasksController);

TasksController.$inject = ['$scope', 'tasksService', '$filter'];

function TasksController($scope, tasksService, $filter) {
  $scope.deleteTask = deleteTask;
  $scope.order = order;
  $scope.tasks = tasksService.tasks;
  $scope.addTask = addTask;
  $scope.editTaskName = editTaskName;
  $scope.changeDate = changeDate;
  $scope.editTaskStatus = editTaskStatus;
  var orderBy = $filter('orderBy');

  tasksService.loadTasks();


  function addTask() {
    tasksService.addTask($scope.taskName, $scope.taskDate);
    $scope.tasks = tasksService.tasks;
    $scope.taskName = undefined;
    $scope.taskDate = undefined;
  }

  function deleteTask($index, task) {
    tasksService.deleteTask($index, task);
  }

  function order(predicate, reverse) {
    $scope.tasks = orderBy(tasksService.tasks, predicate, reverse);
  }


  function editTaskName(event, task) {
    var target = event.target;
    var newTaskName = target.innerText;
    if (newTaskName != task.taskname) {
      if (newTaskName.length) {
        tasksService.editTaskName(task, newTaskName);
      } else {
        target.innerText = task.taskname;
      }
    }
  }

  function changeDate(task, newDate) {
    if (newDate) {
      tasksService.editTaskDate(task, newDate);
    }
  }

  function editTaskStatus(task) {
    tasksService.editTaskStatus(task);
  }
}
