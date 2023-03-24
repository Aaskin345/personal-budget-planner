const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Food',
        'Transportation',
        'Entertainment',
        'Fees',
        'Loans',
        'Shopping',
        'Leisure',
        'Other',
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);
if (mongoose.models.Expense) {
  // If the Expense model exists, delete it
  delete mongoose.connection.models['Expense'];
}

const Expense =
  mongoose.model.Expense || mongoose.model('Expense', expenseSchema);

module.exports = Expense;
export default Expense;
