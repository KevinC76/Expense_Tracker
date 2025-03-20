const mongoose = require('mongoose');
const emailManager = require('../../../managers/emailManager');

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model('users');

  const { email } = req.body;

  if (!email) throw 'Email is require';

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw 'User not found!';

  // generate 5 random digits
  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    `Your reset code is ${resetCode}`,
    `<h1>Your reset code is ${resetCode}</h1>`,
    'Reset Your Password Expense Tracker!'
  );

  res.status(200).json({ status: 'Reset code sent to your email' });
};

module.exports = forgotPassword;
