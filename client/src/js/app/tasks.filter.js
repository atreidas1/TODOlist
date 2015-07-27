angular.
  module('toDoList').
  filter('tasksFilter', tasksFilter);

function tasksFilter() {
  return function (input, filterBy) {
    var out = [];
    filterBy = filterBy.toLowerCase();
    if (filterBy == 'all') {
      out = input;
    } else {
      switch(filterBy){
        case 'active': out=_.where(input,{status:false});
        break;
        case 'finished': out=_.where(input,{status:true});
        break;
      }
    }
    return out;
  };
}
