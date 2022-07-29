import { getSession } from 'next-auth/react';
import Translator from '../../../../../models/Translator';
import db from '../../../../../utils/db';

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
  const translator = await Translator.findById(req.query.id);
  await db.disconnect();
  res.send(translator);
};
const putHandler = async (req, res) => {
  await db.connect();
  const translator = await Translator.findById(req.query.id);
  if (translator) {
    translator.name = req.body.name;
    translator.slug = req.body.slug;
    translator.price = req.body.price;
    translator.category = req.body.category;
    translator.image = req.body.image;
    translator.description = req.body.description;
    await translator.save();
    await db.disconnect();
    res.send({ message: 'Sign Translator updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Sign Translator not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const translator = await Translator.findById(req.query.id);
  if (translator) {
    await translator.remove();
    await db.disconnect();
    res.send({ message: 'Translator deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Sign translator not found' });
  }
};
export default handler;
