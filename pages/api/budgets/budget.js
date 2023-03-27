import { getSession } from 'next-auth/react';
import nextConnect from 'next-connect';
import Budget from '../../../models/Budget';
import dbConnect from '../../../utils/sedd';

// Connect to the database using the seed function
dbConnect();

const handler = nextConnect();

// POST /api/budget
handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { budget } = req.body;

  const newBudget = new Budget({
    budget,
    user: session.user._id,
  });

  try {
    const savedBudget = await newBudget.save();
    return res.json({ budget: savedBudget.budget });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
// GET /api/budget
handler.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const budget = await Budget.findOne({ user: session.user._id });
    return res.json(budget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/budget
handler.put(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { budget } = req.body;

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { user: session.user._id },
      { budget },
      { new: true }
    );
    return res.json({ budget: updatedBudget.budget });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default handler;
