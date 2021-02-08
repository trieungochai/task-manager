const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// Goal: Have signup send back auth token
// 1. Generate a token for the saved user
// 2. Send back both the token and the user
router.post('/users', async(req, res) => {
  const user = new User(req.body);

  try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
  } catch(err) {
      res.status(400).send(err);
  };
});

router.post('/users/login', async(req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({ user, token });
  } catch(err) {
      res.status(400).send(err);
  }
});

router.post('/users/logout', auth, async(req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
      });
      await req.user.save();

      res.send();
  } catch(err) {
      res.status(500).send(err);
  };
});

// Goal: Create a way to logout of all sessions
// (Create the router handler to wipe the tokens array)
router.post('/users/logoutAll', auth, async(req, res) => {
  try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
  } catch(err) {
      res.status(500).send();
  };
});

router.get('/users/me', auth, async(req, res) => {
  res.send(req.user);
});

router.get('/users/:id', async(req, res) => {
  try {
      const user = await User.findById(req.params.id);

      if(!user) {
        return res.status(404).send();
      }

      res.send(user);
  } catch(err) {
      res.status(500).send(err);
  };
});

router.patch('/users/:id', async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdates = updates.every(update => allowedUpdates.includes(update));

  if(!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
      // const user = await User.findByIdAndUpdate(req.params.id);
      const user = await User.findById(req.params.id);
      user.forEach(update => user[update] = req.body[update]);
      await user.save()

      if(!user) {
        return res.status(404).send()
      }
      
      res.send(user);
  } catch(err) {
      res.status(400).send(err);
  };
});

router.delete('/users/:id', async(req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);

      if(!user) {
        return res.status(404).send();
      }

      res.send(user);
  } catch(err) {
      res.status(500).send(err)
  };
});

module.exports = router;