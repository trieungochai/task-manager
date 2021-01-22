// CRUD
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(databaseName);

  // db.collection('users').findOne({ _id: new ObjectID('600aaab93efe1a238ed66554') }, (error, user) => {
  //   if (error) {
  //     console.log('Unable to fetch!');
  //   }

  //   console.log(user);
  // });

  // db.collection('users').find({ age: 28 }).toArray((error, user) => {
  //   if (error) {
  //     console.log('Unable to fetch!');
  //   }

  //   console.log(user);
  // });

  // db.collection('users').find({ age: 28 }).count((error, user) => {
  //   if (error) {
  //     console.log('Unable to fetch!');
  //   }

  //   console.log(user);
  // });

  // 1. Use findOne to fetch the last task by its id (print doc to console)
  // 2. Use find to fetch all tasks that are not completed (print docs to console)
  
  db.collection('tasks').findOne({ _id: new ObjectID('600a7d9f13d4d21e55a2d2e5') }, (error, task) => {
    if (error) {
      console.log('Unable to fetch!');
    }

    console.log(task);
  });

  db.collection('tasks').find({ completed: false }).toArray((error, task) => {
    if (error) {
      console.log('Unable to fetch!');
    }

    console.log(task);
  });
});