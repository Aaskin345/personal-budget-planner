import Customer from '../../../models/Customer';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.query.id);
  await db.disconnect();
  res.send(customer);
};

export default handler;
