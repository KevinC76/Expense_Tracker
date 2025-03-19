const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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

  const accessToken = await jsonwebtoken.sign(
    {
      _id: createdUser._id,
      name: createdUser.name,
    },
    process.env.jwt_salt
  );

  res
    .status(201)
    .json({ status: 'User register successfully', accessToken: accessToken });
};

module.exports = register;
