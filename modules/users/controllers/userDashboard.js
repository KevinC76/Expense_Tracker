const mongoose = require('mongoose');

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model('users');
  const transactionsModel = mongoose.model('transactions');

  // filter the information using select
  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select('-password');

  const transactions = await transactionsModel
    .find({
      user_id: req.user._id,
    })
    .sort('-createdAt')
    .limit(5);

  res.status(200).json({ status: 'success', data: getUser, transactions });
};

module.exports = userDashboard;
