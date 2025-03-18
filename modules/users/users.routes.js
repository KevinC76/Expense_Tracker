const express = require('express');
const register = require('./controllers/register');

const userRoutes = express();

// routes
userRoutes.post('/register', register);

module.exports = userRoutes;
