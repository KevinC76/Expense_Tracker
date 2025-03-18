const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const usersModel = mongoose.model('users');

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({ email: email });

  if (!getUser) throw 'This email is not found in the system';

  // use bcrypt to compare password
  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw 'Email and Password do not match!';

  res
    .status(200)
    .json({ status: 'sucess', message: 'User login successfully!' });
};

module.exports = login;
