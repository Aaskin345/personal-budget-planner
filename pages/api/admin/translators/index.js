import { getSession } from 'next-auth/react';
import Translator from '../../../../models/Translator';
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
  const newTranslator = new Translator({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    category: 'sample category',
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });

  const translator = await newTranslator.save();
  await db.disconnect();
  res.send({ message: 'Sign Translatot created successfully', translator });
};

const getHandler = async (req, res) => {
  await db.connect();
  const translators = await Translator.find({});
  await db.disconnect();
  res.send(translators);
};
export default handler;
