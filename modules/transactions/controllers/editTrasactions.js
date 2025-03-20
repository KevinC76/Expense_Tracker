const mongoose = require('mongoose');
const validator = require('validator');

const editTransactions = async (req, res) => {
  const transactionsModel = mongoose.model('transactions');
  const users = mongoose.model('users');

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (transaction_type !== 'income' && transaction_type !== 'expense')
    throw 'Transaction type must be income or expense';

  if (!transaction_id) throw 'Please provide the id!';

  if (!validator.isMongoId(transaction_id.toString()))
    throw 'Provide a valid Id!';

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw 'Transaction not found!';

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
