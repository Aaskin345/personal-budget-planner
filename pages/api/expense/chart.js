import { getSession } from 'next-auth/react';
import Expense from '../../../models/Expense';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  await db.connect();
  const expenses = await Expense.find({ user: session.user.id });

  const data = expenses.reduce((acc, expense) => {
    const date = expense.date.toISOString().slice(0, 10);
    const category = expense.category;
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][category]) {
      acc[date][category] = 0;
    }
    acc[date][category] += expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([date, categories]) => {
    return {
      date,
      ...categories,
    };
  });

  res.status(200).json(chartData);
}
