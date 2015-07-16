angular.module('toDoList').filter('tasksFilter', tasksFilter);

function tasksFilter() {
  return function (input, filterBy) {
    var out = [];
    filterBy = filterBy.toLowerCase();
    if (filterBy == "all") {
      out = input;
    } else {
      angular.forEach(input, function (task) {
        switch (filterBy) {
          case "active":
            if (!task.finished) {
              out.push(task);
            }
            break;
          case "finished":
            if (task.finished) {
              out.push(task);
            }
            break;
        }

      })
    }
    return out;
  }
}
