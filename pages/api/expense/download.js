import Expense from '../../../models/Expense';
import { stringify } from 'csv-stringify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const expenses = await Expense.aggregate([
        {
          $group: {
            _id: {
              name: '$name',
              category: '$category',
              amount: '$amount',
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.name': 1,
            '_id.category': 1,
            '_id.amount': 1,
          },
        },
      ]);

      // Define the fields for the CSV file
      const fields = ['Name', 'Category', 'Amount', 'Count'];

      // Convert the expenses to a CSV string
      const csv = await new Promise((resolve, reject) => {
        stringify(
          expenses,
          { header: true, columns: fields },
          (err, output) => {
            if (err) {
              reject(err);
            } else {
              resolve(output);
            }
          }
        );
      });

      // Set the content type and attachment header
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=expenses.csv');

      // Send the CSV file to the client
      res.send(csv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
