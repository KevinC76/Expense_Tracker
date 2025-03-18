require('express-async-errors');
require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const errorHandler = require('./handlers/errorHandlers');

const app = express();

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log('success connect to DB');
  })
  .catch(() => {
    console.log('faild to connect to DB');
  });

//models initialization
require('./models/users.model');

app.use(express.json());

//error handler
app.use(errorHandler);

app.listen(8000, () => {
  console.log('App is running');
});
