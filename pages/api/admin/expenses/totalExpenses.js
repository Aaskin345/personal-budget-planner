import db from '../../../../utils/db';
import Expense from '../../../../models/Expense';

export default async function handler(req, res) {
  await db.connect();

  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const expenses = await Expense.find({ date: { $gte: lastWeek } });

  const data = expenses.reduce((acc, expense) => {
    const dateStr = expense.date.toISOString().slice(0, 10);
    acc[dateStr] = (acc[dateStr] || 0) + expense.amount;
    return acc;
  }, {});

  const dataArray = Object.keys(data).map((dateStr) => {
    return {
      date: dateStr,
      total: data[dateStr],
    };
  });

  res.status(200).json(dataArray);
}
