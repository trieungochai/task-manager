const express = require('express');
const multer = require('multer');
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

// Goal: Refactor the update profile route
// 1. Add the authentication middleware into the mix
// 2. Use the existing user document instead of fetching vi param id

router.patch('/users/me', auth, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdates = updates.every(update => allowedUpdates.includes(update));

  if(!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
      updates.forEach(update => user[update] = req.body[update]);
      await req.user.save();
      res.send(user);
  } catch(err) {
      res.status(400).send(err);
  };
});

router.delete('/users/me', auth, async(req, res) => {
  try {
      // const user = await User.findByIdAndDelete(req.params.id);

      // if(!user) {
      //   return res.status(404).send();
      // }
      await req.user.remove();
      res.send(req.user);
  } catch(err) {
      res.status(500).send(err)
  };
});

// Goal: Setup endpoint for avatar upload
// 1. Setup multer to store uploads in in an avatars directory
// 2. Choose name 'avatars' for the key when registering the middleware

// Goal: Add validation to avatar upload route
// 1. Limit the upload size to 1MB
// 2. Only allow jpg, jpeg, png

// Goal: Clean up error handling
// 1. Setup an err handling function
// 2. Send back a 400 with the err msg

const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if(file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please upload an image!'));
    }

    callback(undefined, true);
  }
});

router.post('/users/me/avatar', upload.single('avatar'), async(req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send( {error: error.message} );
});

// Goal: Setup route to delete avatar
// (Set the field to undefined and save the user sending back a 200)
router.delete('/user/me/avatar', auth, async(req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;