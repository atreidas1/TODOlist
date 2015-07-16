angular
  .module('toDoList')
  .service('tasksService', tasksService);

function tasksService() {
  this.tasks=[]
  this.addTask=addTask;
  this.deleteTask=deleteTask;

  return this;

  function addTask(name,date){
    var task={};
    task.taskname=name;
    task.date=date;
    task.finished=false;
    this.tasks.push(task);
  }

  function deleteTask(index){
    this.tasks.splice(index, 1);
  }
}
