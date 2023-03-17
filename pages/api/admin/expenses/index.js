import { getSession } from 'next-auth/react';
import Expense from '../../../../models/Expense';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    await db.connect();
    const expenses = await Expense.find({}).populate('user', 'name');
    await db.disconnect();
    res.send(expenses);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
