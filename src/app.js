const path = require('path');
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/userRouter');

const app = express();
app.use(express.json());
app.use(userRouter);

// Serve static files from the React app in cork/clien/build
app.use(express.static(path.join(__dirname, '../client/build')));

// Catchall return index.html page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build.index.html'));
});

module.exports = app;
