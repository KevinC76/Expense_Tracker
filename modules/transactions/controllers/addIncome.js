const mongoose = require('mongoose');
const validator = require('validator');

const addIncome = async (req, res) => {
  const usersModel = mongoose.model('users');
  const transactionsModel = mongoose.model('transactions');

  const { amount, remarks } = req.body;

  // validation
  if (!amount) throw 'Amount is required!';
  if (!remarks) throw 'Remarks is required!';

  if (remarks.length < 5) throw 'Remarks must be at least 5 characters long!';

  // if (typeof amount !== 'number') throw 'amount must be number!';

  if (!validator.isNumeric(amount.toString()))
    throw 'Amount must be valid number!';

  if (amoutn < 0) throw 'Amount is not be negative!';

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: 'income',
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Income added successfully',
  });
};

module.exports = addIncome;
