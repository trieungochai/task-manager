const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
  dest: 'images',
});
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware:  new req -> run router handler
// with middleware:     new req -> do something -> run router handler
// we can customize the behavior of the server to fit our needs.

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});