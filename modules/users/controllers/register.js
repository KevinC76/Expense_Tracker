const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtManager = require('../../../managers/jwtManager');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const usersModel = mongoose.model('users');

  const { email, password, confirm_password, name, balance } = req.body;

  // validation

  if (!email) throw 'Email must be provided!';
  if (!password) throw 'Password must be provided!';
  if (password.length < 5) throw 'Password must be at least 5 characters long!';

  if (!name) throw 'Name must be provided!';
  if (password !== confirm_password)
    throw 'Password and Confirm Password is not same!';

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw 'This email already exist!';

  const hashPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  // using node mailer for sending email to user
  var transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'a669433d0da510',
      pass: 'be94bd3d97e2ee',
    },
  });

  await transport.sendMail({
    to: createdUser.email,
    from: 'info@expensetracker.com',
    text: 'Welcome to expense tracker. We hope you can manage your expense with our app.',
    html:"<h1>Welcome to expense tracker.</h1> </br> We hope you can manage your expense with our app.",
    subject: 'Welcome to Expense Tracker!',
  });

  res
    .status(201)
    .json({ status: 'User register successfully', accessToken: accessToken });
};

module.exports = register;
