import { getSession } from 'next-auth/react';
import Customer from '../../../../models/Customer';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newTranslator = new Customer({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image: '/images/shirt1.jpg',

    description: 'sample description',
  });

  const customer = await newTranslator.save();
  await db.disconnect();
  res.send({ message: ' created successfully', customer });
};

const getHandler = async (req, res) => {
  await db.connect();
  const customers = await Customer.find({});
  await db.disconnect();
  res.send(customers);
};
export default handler;
