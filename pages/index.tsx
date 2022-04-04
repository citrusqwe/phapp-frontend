import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Feed from '../components/Feed';
import { getAll, getAllCategories } from '../client';
import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import PinDetail from '../components/PinDetail';
Modal.setAppElement('#__next');

const Home: NextPage = ({ user, pins, tags }: any) => {
  const router = useRouter();

  return (
    <Layout user={user} tags={tags}>
      <Feed pins={pins} />
      <Modal
        isOpen={!!router.query.id}
        onRequestClose={() => router.push('/')}
        className="absolute inset-24 bg-white rounded-md overflow-auto"
        overlayClassName="fixed inset-0 bg-black/25"
      >
        <PinDetail id={router.query.id} />
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const pins = await getAll();
  const tags = await getAllCategories();

  return {
    props: {
      user: session?.user,
      tags,
      pins,
    },
  };
}

export default Home;
