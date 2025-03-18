require('express-async-errors');

const express = require('express');
const errorHandler = require('./handlers/errorHandlers');

const app = express();

app.use(express.json());

//routes

//error handler
app.use(errorHandler);

app.listen(8000, () => {
  console.log('App is running');
});
