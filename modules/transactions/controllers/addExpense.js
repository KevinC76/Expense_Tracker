const mongoose = require('mongoose');
const validator = require('validator');

const addExpense = async (req, res) => {
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
    transaction_type: 'expense',
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      // in MongoDB there is only $inc (increment), there is no $dec (decrement)
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Expense added successfully',
  });
};

module.exports = addExpense;
