import Translator from '../../../models/Translator';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const translator = await Translator.findById(req.query.id);
  await db.disconnect();
  res.send(translator);
};

export default handler;
