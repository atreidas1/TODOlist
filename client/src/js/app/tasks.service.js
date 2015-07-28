angular
  .module('toDoList')
  .service('tasksService', tasksService);

tasksService.$inject = ['$resource'];

function tasksService($resource) {
  var serv = this;
  serv.tasks = [];
  serv.addTask = addTask;
  serv.deleteTask = deleteTask;
  serv.loadTasks = loadTasks;
  serv.decodeDate = decodeDate;
  serv.editTaskName = editTaskName;
  serv.editTaskDate = editTaskDate;
  serv.editTaskStatus = editTaskStatus;
  serv.userUri=undefined;
  serv.tasksResource = $resource('/api/v1/tasks/:taskId/?limit=0', {
    taskId: '@id'
  }, {
    editTask: {method: 'PATCH'}
  });

  return serv;

  function decodeDate(task) {
    var dateArray = task.deadline.split('-');
    task.deadline = new Date(dateArray[0], dateArray[1] * 1 , dateArray[2]);
  }

  function loadTasks() {
    serv.tasksResource.get(function (response) {
        var tasksFromServer = response.objects;
        for (var i = 0; i < tasksFromServer.length; i++) {
          var task = tasksFromServer[i];
          decodeDate(task);
          serv.tasks.push(task);
        }
      },
      function (response) {
      });
  }

  function addTask(name, date) {
    var task = {};
    task.task = name;
    task.deadline = date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate();
    task.user = serv.userUri;
    task.status = false;

    serv.tasksResource.save({}, task,
      function (response) {
        decodeDate(task);
        task.id = response.id;
        serv.tasks.push(task);
      },
      function (response) {
      });
  }

  function deleteTask(index, task) {
    serv.tasksResource.delete({
        taskId: task.id
      },
      function (response) {
        serv.tasks.splice(index, 1);
      },
      function (response) {
      });
  }

  function editTaskName(task, newTaskName) {
    serv.tasksResource.editTask({
        taskId: task.id
      },{task: newTaskName },
      function (response) {
        task.task=newTaskName;
      },
      function (response) {
      });
  }

  function editTaskDate(task, newDate) {
     var newDeadline = newDate.getUTCFullYear() + '-' + newDate.getUTCMonth() + '-' + newDate.getUTCDate();
     serv.tasksResource.editTask({
        taskId: task.id
      },{deadline: newDeadline },
      function (response) {
        task.deadline=new Date(response.deadline);
      },
      function (response) {
      });
  }

  function editTaskStatus(task) {
     serv.tasksResource.editTask({
        taskId: task.id
      },{status: task.status},
      function (response) {
      },
      function (response) {
        task.status=!task.status;
      });
  }
}
