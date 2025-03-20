const nodemailer = require('nodemailer');

const emailManager = async (to, text, html, subject) => {
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
    to: to,
    from: 'info@expensetracker.com',
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
