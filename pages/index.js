// import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import TranslatorItem from '../components/TranslatorItem';
// import data from '../utils/data';
import Translator from '../models/Translator';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ translators }) {
  const { state, dispatch } = useContext(Store);
  const { favorites } = state;

  const addToFavoritesHandler = async (translator) => {
    const existItem = favorites.favoritesItems.find(
      (x) => x.slug === translator.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/translators/${translator._id}`);

    if (1 < quantity) {
      return toast.error(
        'Sorry. Translator is on another session. Try Again later'
      );
    }
    dispatch({
      type: 'FAVORITES_ADD_ITEM',
      payload: { ...translator, quantity: 1 },
    });

    toast.success('Sign Translator added to the favorites');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {translators.map((translator) => (
          <TranslatorItem
            translator={translator}
            key={translator.slug}
            addToFavoritesHandler={addToFavoritesHandler}
          ></TranslatorItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const translators = await Translator.find().lean();
  return {
    props: {
      translators: translators.map(db.convertDocToObj),
    },
  };
}
