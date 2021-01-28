require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('600fb3fea2f16213fcb5827f', { age: 1 }).then(user => {
  console.log(user);
  return User.countDocuments({ age: 1 });
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});