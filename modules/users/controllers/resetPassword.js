const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model('users');

  const { email, new_password, reset_code } = req.body;

  if (!email) throw 'Email is required!';
  if (!new_password) throw 'New password is required!';
  if (!reset_code) throw 'Reset code is required!';
  if (new_password < 5) throw 'Password must be at least 5 characters long!';

  const getUser = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUser) throw 'Resest code is not match!';

  const hashPass = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashPass,
      reset_code: '',
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({ status: 'success', message: 'Status reset' });
};

module.exports = resetPassword;
