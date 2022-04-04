import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { getAllCategories, getPinsByTags } from '../../client';
import Feed from '../../components/Feed';
import Layout from '../../components/Layout';

const CategoryPage: NextPage = ({ user, id, pins, tags }: any) => {
  const { query } = useRouter();

  return (
    <Layout user={user} tags={tags} currentTag={query.tag}>
      <Feed pins={pins} />
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const pins = await getPinsByTags(ctx.query.tag as string);
  const tags = await getAllCategories();

  return {
    props: {
      user: session?.user,
      id: session?.id,
      pins,
      tags,
    },
  };
}
export default CategoryPage;
