angular
  .module('toDoList')
  .controller('TasksController', TasksController);

TasksController.$inject = ['$scope', 'tasksService'];

function TasksController($scope, tasksService) {
  $scope.deleteTasks = deleteTasks;
  $scope.addTask = addTask;
  $scope.editTaskName = editTaskName;
  $scope.changeDate = changeDate;
  $scope.editTaskStatus = editTaskStatus;
  $scope.gridOptions = {};
  tasksService.loadTasks();

  var columnDefs = [
    {name: 'status',type: 'boolean',width: '10%'},
    {name: 'task',enableCellEdit: true},
    {name: 'deadline',type: 'date',cellFilter: 'date:"dd-MM-yyyy"',width:'10%'},
  ];

  $scope.gridOptions = {
    enableRowSelection: true,
    showGridFooter: true,
    enableFiltering: true,
    enableSelectAll: false,
    multiSelect:false,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    columnDefs: columnDefs,
    data: tasksService.tasks
  };

  $scope.gridOptions.onRegisterApi = function (gridApi) {
    $scope.gridApi = gridApi;
    gridApi.edit.on.afterCellEdit($scope, defAction);
  };

  function defAction(rowEntity, colDef, newValue, oldValue){
    var colum = colDef.name;
    switch (colum) {
        case 'task':
          editTaskName(oldValue, newValue, rowEntity);
          break;
        case 'status':
          editTaskStatus(oldValue, newValue, rowEntity);
          break;
        case 'deadline':
          changeDate(oldValue, newValue, rowEntity);
          break;
      }
  }

  function addTask() {
    tasksService.addTask($scope.taskName, $scope.taskDate);
    $scope.gridOptions.data = tasksService.tasks;
    $scope.taskName = undefined;
    $scope.taskDate = undefined;
  }

  function deleteTasks() {
    var selectedTask=$scope.gridApi.selection.getSelectedRows()[0];
    var selectedIndex=$scope.gridOptions.data.indexOf(selectedTask);
    if(selectedIndex>=0){
      tasksService.deleteTask(selectedIndex,selectedTask);
      $scope.gridApi.selection.clearSelectedRows();
    }
  }

  function editTaskName(oldValue, newValue, task) {
    if (oldValue != newValue) {
      if (newValue.length) {
        tasksService.editTaskName(task, newValue);
      } else {
        task.task = oldValue;
      }
    }
  }

  function changeDate(oldValue, newValue, task) {
    if (newValue) {
      tasksService.editTaskDate(task, newValue);
    }
  }

  function editTaskStatus(oldValue, newValue, task) {
    if (oldValue != newValue) {
      tasksService.editTaskStatus(task);
    }else{
      task.status=oldValue;
    }
  }
}
