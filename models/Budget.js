const mongoose = require('mongoose');
const budgetSchema = new mongoose.Schema(
  {
    budget: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Budget) {
  // If the Expense model exists, delete it
  delete mongoose.connection.models['Budget'];
}
const Budget = mongoose.model.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;
