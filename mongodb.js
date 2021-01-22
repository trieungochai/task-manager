// CRUD
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(databaseName);

  // db.collection('users').insertOne({
  //   name: 'Trieungochai',
  //   age: 28
  // }, (error, result) => {
  //   if (error) {
  //     console.log('Unable to insert user!');
  //   }

  //   console.log(result.ops);
  // });

  // db.collection('users').insertMany([
  //   {
  //     name: 'Lam Thi Hoang Anh',
  //     age: 28
  //   }, {
  //     name: 'Trieu Ngoc Ha',
  //     age: 22
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     console.log('Unable to insert documents!');
  //   }

  //   console.log(result.ops);
  // });

  db.collection('tasks').insertMany([
    {
      description: 'Clean the house',
      completed: true
    }, {
      description: 'Renew inspection',
      completed: false
    }, {
      description: 'Pot plants',
      completed: false
    }
  ], (error, result) => {
    if (error) {
      console.log('Unable to insert tasks!');
    }

    console.log(result.ops);
  });
});