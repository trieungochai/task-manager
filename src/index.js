const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fieldSize: 1000000
//   },
//   fileFilter(req, file, callback) {
//     // if(!file.originalname.endsWith('.pdf')) {
//     //   return callback(new Error('Please upload a PDF!'));
//     // }
//     if(file.originalname.match(/\.(doc|docx)$/)) {
//       return callback(new Error('Please upload a Word document'))
//     }
//     callback(undefined, true);
//     // callback(new Error('File must be a PDF'));
//     // callback(undefined, true);
//     // callback(undefined, false);
//   }
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message });
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware:  new req -> run router handler
// with middleware:     new req -> do something -> run router handler
// we can customize the behavior of the server to fit our needs.

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});