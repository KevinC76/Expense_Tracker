const mongoose = require('mongoose');
const validator = require('validator');

const editTransactions = async (req, res) => {
  const transactionsModel = mongoose.model('transactions');
  const usersModel = mongoose.model('users');

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (transaction_type !== 'income' && transaction_type !== 'expense')
    throw 'Transaction type must be income or expense';

  if (!transaction_id) throw 'Please provide the id!';

  if (!remarks) throw 'Remarks provide the id!';
  if (!amount) throw 'Amount provide the id!';

  if (amount < 0) throw 'amount can not be negative value';

  if (!validator.isMongoId(transaction_id.toString()))
    throw 'Provide a valid Id!';

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw 'Transaction not found!';

  if (transaction_type === getTransaction.transaction_type)
    throw 'can not update the same same transaction type';

  if (transaction_type === 'income') {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
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
  } else {
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      transaction_type,
      amount,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({ status: 'from edit trans' });
};

module.exports = editTransactions;
