import dbConnect from '../../../utils/sedd';
import Expense from '../../../models/Expense';
import { ObjectId } from 'mongodb';
dbConnect();
export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { name, amount, category } = req.body;

      const expense = await Expense.findById(id);

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      expense.name = name;
      expense.amount = amount;
      expense.category = category;

      await expense.save();

      res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      const expense = await Expense.findById({ _id: new ObjectId(id) });

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      await expense.remove();

      res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
