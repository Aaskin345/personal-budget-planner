import { getSession } from 'next-auth/react';
import User from '../../../models/User';
import db from '../../../utils/db';
import Expense from '../../../models/Expense';

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  await db.connect();

  const expensesCount = await Expense.countDocuments();
  const usersCount = await User.countDocuments();

  const expensesPriceGroup = await Expense.aggregate([
    {
      $group: {
        _id: null,
        expenses: { $sum: '$amount' },
      },
    },
  ]);
  const expensesPrice =
    expensesPriceGroup.length > 0 ? expensesPriceGroup[0].expenses : 0;

  const salesData = await Expense.aggregate([
    {
      $group: {
        _id: { $week: '$createdAt' },
        totalExpenses: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  await db.disconnect();

  res.send({
    expensesCount,

    usersCount,
    expensesPrice,
    salesData,
  });
};

export default handler;
