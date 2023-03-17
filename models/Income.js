const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
  {
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Income) {
  // If the Income model exists, delete it
  delete mongoose.connection.models['Income'];
}

const Income = mongoose.model('Income', incomeSchema);

export { Income };
