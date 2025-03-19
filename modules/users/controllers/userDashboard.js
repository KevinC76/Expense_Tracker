const userDashboard = async (req, res) => {
  console.log(req.user);

  res.status(200).json({ status: 'from user dashboard' });
};

module.exports = userDashboard;
