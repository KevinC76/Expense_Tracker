const mongoose = require('mongoose');

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model('users');

  console.log(req.user);

  // filter the information using select
  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select('-password');

  res.status(200).json({ status: 'success', data: getUser });
};

module.exports = userDashboard;
