import { getSession } from 'next-auth/client';
import dbConnect from '../../../lib/mongodb';
import Expense from '../../../models/Expense';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    await dbConnect();

    const expenses = await Expense.find({ user: session.user._id });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
