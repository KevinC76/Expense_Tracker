require('express-async-errors');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const errorHandler = require('./handlers/errorHandlers');

const userRoutes = require('./modules/users/users.routes');
const transactionsRoute = require('./modules/transactions/transactions.routes');

const app = express();
// cors is for FE access BE, if they have a difference IP
app.use(cors());

// mongoose connection
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
require('./models/transactions.model');

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionsRoute);

//error handler
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'failed',
    message: 'not found',
  });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log('App is running');
});
