const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async(req, res) => {
  const user = new User(req.body);

  // user.save().then(() => {
  //   res.status(201).send(user);
  // }).catch(error => {
  //   res.status(400).send(error);
  // });

  try {
    await user.save();
    res.status(201).send(user);
  } catch(err) {
    res.status(400).send(err);
  };
});

app.get('/users', async(req, res) => {
  // User.find({}).then(users => {
  //   res.send(users);
  // }).catch(error => {
  //   res.status(500).send(error);
  // });

  try {
    const users = await User.find({});
    res.send(users);
  } catch(err) {
    res.status(500).send(err);
  };
});

app.get('/users/:id', async(req, res) => {
  const _id = req.params.id;

  // User.findById(_id).then(user => {
  //   if (!user) {
  //     return res.status(404).send();
  //   }

  //   res.send(user);
  // }).catch(error => {
  //   res.status(500).send(error);
  // });

  try {
    const user = await User.findById(_id);
    
    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch(err) {
    res.status(500).send(err);
  };
});

app.patch('/users/:id', async(req, res) => {
  const updates = new Object(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdates = updates.every(update => allowedUpdates.includes(update));

  if (!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) {
      res.status(404).send(user);
    }

    res.send(user);
  } catch(err) {
    res.status(400).send(err);
  };
});

// Goal: Refactor task routes to use async/await

app.post('/tasks', async(req, res) => {
  const task = new Task(req.body);

  // task.save().then(() => {
  //   res.status(201).send(task);
  // }).catch(error => {
  //   res.status(400).send(error);
  // });

  try {
    await task.save();
    res.status(201).send(task);
  } catch(err) {
    res.status(400).send(err);
  };
});

app.get('/tasks', async(req, res) => {
  // Task.find({}).then(tasks => {
  //   res.send(tasks);
  // }).catch(error => {
  //   res.status(500).send(error);
  // });

  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch(err) {
    res.status(500).send(err);
  };
});

app.get('/tasks/:id', async(req, res) => {
  const _id = req.params.id;

  // Task.findById(_id).then(task => {
  //   if (!task) {
  //     return res.status(404).send();
  //   }

  //   res.send(task);
  // }).catch(error => {
  //   res.status(500).send(error);
  // });

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch(err) {
    res.status(500).send(err);
  };
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});