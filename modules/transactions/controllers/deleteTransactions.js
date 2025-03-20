const mongoose = require('mongoose');
const validator = require('validator');

const deleteTransactions = async (req, res) => {
  const transactionsModel = mongoose.model('transactions');
  const usersModel = mongoose.model('users');

  const { transaction_id } = req.params;

  // the postion is important, cause if you put under the getTransaction, the transaction_id will become objectID and can't be type cast to string
  if (!validator.isMongoId(transaction_id.toString()))
    throw 'Provide a valid Id!';

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw 'Transaction not found!';

  // update user balance
  if (getTransaction.transaction_type === 'income') {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionsModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: 'Deleted successfully',
  });
};

module.exports = deleteTransactions;
