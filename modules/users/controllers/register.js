const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../managers/jwtManager');
const emailManager = require('../../../managers/emailManager');

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

  await emailManager(
    createdUser.email,
    'Welcome to expense tracker. We hope you can manage your expense with our app.',
    '<h1>Welcome to expense tracker.</h1> </br> We hope you can manage your expense with our app.',
    'Welcome to Expense Tracker!'
  );

  res
    .status(201)
    .json({ status: 'User register successfully', accessToken: accessToken });
};

module.exports = register;
