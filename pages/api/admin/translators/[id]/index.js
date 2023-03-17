import { getSession } from 'next-auth/react';
import db from '../../../../../utils/db';
import Customer from '../../../../../models/Customer';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.query.id);
  await db.disconnect();
  res.send(customer);
};
const putHandler = async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.query.id);
  if (customer) {
    customer.name = req.body.name;
    customer.slug = req.body.slug;
    customer.description = req.body.description;
    customer.image = req.body.image;

    await customer.save();
    await db.disconnect();
    res.send({ message: 'updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: ' not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.query.id);
  if (customer) {
    await customer.remove();
    await db.disconnect();
    res.send({ message: ' deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: ' not found' });
  }
};
export default handler;
