import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
if (mongoose.models.Category) {
  // If the Expense model exists, delete it
  delete mongoose.connection.models['Category'];
}
export default mongoose.models.Category ||
  mongoose.model('Category', categorySchema);
