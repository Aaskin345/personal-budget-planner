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

  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = expense.date.toISOString().slice(0, 10);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});

  res.status(200).json(expensesByDate);
}
