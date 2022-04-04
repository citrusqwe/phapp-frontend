import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { searchPins } from '../../client';
import Feed from '../../components/Feed';
import Layout from '../../components/Layout';

const SearchPage = ({ user, pins }: any) => {
  return (
    <Layout user={user}>
      <Feed pins={pins} />
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const pins = await searchPins(ctx.query.term as string);
  console.log(pins);

  return {
    props: {
      user: session?.user,
      id: session?.id,
      pins,
    },
  };
}

export default SearchPage;
