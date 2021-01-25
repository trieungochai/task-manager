const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

// const me = new User({
//   name: 'Cai',
//   age: 'lol'
// });

// me.save().then(() => {
//   console.log(me);
// }).catch(error => {
//   console.log('Error!', error);
// });

// Goal: Create a model for tasks
const Task = mongoose.model('task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const task = new Task({
  description: 'Learn the Mongoose Library',
  completed: false
});

task.save().then(() => {
  console.log(task);
}).catch(error => {
  console.log(error);
});