const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');
const auth = require('../../middleware/auth');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword = require('./controllers/resetPassword');

const userRoutes = express();

// routes
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/forgotpw', forgotPassword);
userRoutes.post('/resetpw', resetPassword);

// middleware
userRoutes.use(auth);

// protected route
userRoutes.get('/dashboard', userDashboard);

module.exports = userRoutes;
