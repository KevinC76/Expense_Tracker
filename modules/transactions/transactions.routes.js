const express = require('express');
const auth = require('../../middleware/auth');
const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addExpense');
const getTransactions = require('./controllers/getTransactions');

const transactionsRoute = express();

// middleware
transactionsRoute.use(auth);

//protected routes
transactionsRoute.post('/addIncome', addIncome);
transactionsRoute.post('/addExpense', addExpense);
transactionsRoute.get('/', getTransactions)

module.exports = transactionsRoute;
