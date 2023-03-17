import How from '../../models/How';
import Customer from '../../models/Customer';
import User from '../../models/User';
import What from '../../models/What';

import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Customer.deleteMany();
  await Customer.insertMany(data.customers);
  await What.deleteMany();
  await What.insertMany(data.whats);
  await How.deleteMany();
  await How.insertMany(data.hows);

  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
