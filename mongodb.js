// CRUD
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(databaseName);

  // const updatePromise = db.collection('users').updateOne({
  //   _id: new ObjectID('60095b9237eee314e380dc41')
  // }, {
  //   $set: {
  //     name: 'Trieu Ngoc Hai'
  //   }
  // })

  // updatePromise.then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  // Goal: use UpdateMany to complete all tasks
  const updatePromise =  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  });

  updatePromise.then(result => {
    console.log(result.modifiedCount);
  }).catch(error => {
    console.log(error);
  });
});