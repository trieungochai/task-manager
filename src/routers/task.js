const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async(req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    // going to copy all of the properties from body over to this obj
    ...req.body,
    // no need to pass the ownerId along with the data you send as part of the req.body
    owner: req.user._id
  });

  try {
      await task.save();
      res.status(201).send(task);
  } catch(err) {
      res.status(400).send(err);
  };
});

// Goal: Setup support for skip

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createAt:desc

router.get('/tasks', auth, async(req, res) => {
  const match = {};
  const sort = {};

  if(req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[part[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
      await req.user.populate({
        patch: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            completed: 1
          }
        }
      }).execPopulate();
      res.send(req.user.tasks);
  } catch(err) {
      res.status(500).send(err);
  };
});

router.get('/tasks/:id', auth, async(req, res) => {
  const _id = req.params.id;

  try {
      const task = await Task.findOne({ _id, owner: req.user._id });
      
      if(!task) {
        return res.status(404).send();
      }

      res.send(task);
  } catch(err) {
      res.status(500).send(err);
    };
  });
  
  // Goal: Change how tasks are updated
  // 1. Find the task
  // 2. Alter the task properties
  // 3. Save the task
  router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['descriptions', 'completed'];
    const isValidUpdates = updates.every(update => allowedUpdates.includes(update));

    if(!isValidUpdates) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        
        if(!task) {
          return res.status(404).send();
        }
        
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch(err) {
        res.status(400).send(err)
    };
  });

router.delete('/tasks/:id', auth, async(req, res) => {
  try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

      if(!task) {
        return res.status(404).send();
      }

      res.send(task);
  } catch(err) {
      res.status(500).send(err);
  };
});

module.exports = router;
