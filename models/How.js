import mongoose from 'mongoose';
const howSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const How = mongoose.models.How || mongoose.model('How', howSchema);
export default How;
