import Expense from '../../../models/Expense';
import ExcelJS from 'exceljs';

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

      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Expenses');

      // Define the columns for the worksheet
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Count', key: 'count', width: 15 },
      ];

      // Add the expenses to the worksheet
      expenses.forEach((expense) => {
        worksheet.addRow({
          name: expense._id.name,
          category: expense._id.category,
          amount: expense._id.amount,
          count: expense.count,
        });
      });

      // Set the content type and attachment header
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader('Content-Disposition', 'attachment; filename=expenses.xls');

      // Send the Excel file to the client
      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
