const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

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
    to: email,
    from: 'info@expensetracker.com',
    text: `Your reset code is ${resetCode}`,
    html: `<h1>Your reset code is ${resetCode}</h1>`,
    subject: 'Reset Your Password Expense Tracker!',
  });

  res.status(200).json({ status: 'Reset code sent to your email' });
};

module.exports = forgotPassword;
