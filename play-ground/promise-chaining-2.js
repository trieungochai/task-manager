// Goal: Mess around with promise chaining
// 1. Load in mongoose and task model
// 2. Remove a given task by Id
// 3. Get & Print the total number of incomplete tasks

require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('600fab4ec668d3137f8ca507').then(task => {
  console.log(task);
  return Task.countDocuments({ completed: false });
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});