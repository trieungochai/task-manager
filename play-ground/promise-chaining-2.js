// Goal: Mess around with promise chaining
// 1. Load in mongoose and task model
// 2. Remove a given task by Id
// 3. Get & Print the total number of incomplete tasks

require('../src/db/mongoose');
const { count } = require('../src/models/task');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('600fab4ec668d3137f8ca507').then(task => {
//   console.log(task);
//   return Task.countDocuments({ completed: false });
// }).then(result => {
//   console.log(result);
// }).catch(err => {
//   console.log(err);
// });

// Goal: Use async/await
// 1. Create deleteTaskAndCount as an async function
//    - Accept id of task to remove
// 2. Use await to delete task and count up incomplete tasks
// 3. Return the count
// 4. Call the function and attach then/catch to lof results

const deleteTaskAndCount = async(id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('600fb746691902145bba34ec').then(count => {
  console.log(count);
}).catch(err => {
  console.log(err);
});