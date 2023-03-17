import dbConnect from '../../../utils/sedd';
import Expense from '../../../models/Expense';
import { getSession } from 'next-auth/react';
dbConnect();

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'signin required' });
  }
  const { user } = session;
  if (!user || !user._id) {
    return res.status(401).json({ message: 'user not found' });
  }
  if (req.method === 'GET') {
    try {
      const expenses = await Expense.find({ user: user._id }).populate(
        'user',
        'name email budget'
      );
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, amount, category, date } = req.body;

      const newExpense = new Expense({
        name,
        amount,
        category,
        date,
        user: user._id,
      });

      await newExpense.save();

      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      console.log(req.query);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
