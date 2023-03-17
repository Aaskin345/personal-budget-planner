import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import Customer from '../../../models/Customer';
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

  const ordersCount = await Order.countDocuments();
  const customersCount = await Customer.countDocuments();
  const usersCount = await User.countDocuments();

  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
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

  await db.disconnect();
  res.send({
    ordersCount,
    customersCount,
    usersCount,
    expensesPrice,
    ordersPrice,
    salesData,
  });
};

export default handler;
