import mongoose from 'mongoose';
const whatSchema = new mongoose.Schema(
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

const What = mongoose.models.What || mongoose.model('What', whatSchema);
export default What;
