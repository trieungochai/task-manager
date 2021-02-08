// Middleware is going to store a new file for each piece of middleware that we're trying to define it
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
  try {
      const token = req.header('Authorization').replace('Bearer', '');
      const decoded = jwt.verify(token, 'thisismynewcourse');
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      if(!user) {
        throw new Error();
      }
      
      res.token = token;
      req.user = user;
      next();
  } catch(err) {
      res.status(401).send({ error: 'Please authenticate.' })
  };
};

module.exports = auth;