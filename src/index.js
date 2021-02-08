const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware:  new req -> run router handler
// with middleware:     new req -> do something -> run router handler
// we can customize the behavior of the server to fit our needs.

// Goal: Setup middleware for maintenance mode
// 1. Register a new middleware function
// 2. Send back a maintenance message with a 503 status code
// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// });

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});