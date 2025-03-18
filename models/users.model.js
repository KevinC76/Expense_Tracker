const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    uniquie: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    default: 0,
  },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
