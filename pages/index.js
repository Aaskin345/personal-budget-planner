import Layout from '../components/Layout';
import TranslatorItem from '../components/TranslatorItem';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.translators.map((translator) => (
          <TranslatorItem
            translator={translator}
            key={translator.slug}
          ></TranslatorItem>
        ))}
      </div>
    </Layout>
  );
}
