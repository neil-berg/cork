const path = require('path');
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/userRouter');
const wineRouter = require('./routers/wineRouter');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(wineRouter);

// Serve static files from the React app in task-manager/client/build
app.use(express.static(path.join(__dirname, '/../client/build')));

// Catchall return React index page for not found pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

module.exports = app;
