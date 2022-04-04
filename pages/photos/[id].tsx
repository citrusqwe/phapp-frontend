import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { getPinById, urlFor } from '../../client';
import Link from 'next/link';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';
import Nav from '../../components/Nav';

const PhotoDetail: NextPage = ({ pin, user }: any) => {
  console.log(pin);

  return (
    <div>
      <Nav user={user} />
      <div className="flex justify-between items-center p-4 mb-10">
        <Link href="/">
          <a className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={pin?.postedBy.image}
              alt={pin?.postedBy.username}
            />
            <span className="ml-3">{pin?.postedBy.username}</span>
          </a>
        </Link>
        <div className="flex items-center">
          <button
            className="transition-all border border-gray-300 hover:border-gray-900 bg-white rounded-md flex items-center justify-center
          px-3 py-2 mr-4 hover:fill-gray-900"
          >
            <AiOutlinePlus />
          </button>
          <a
            href={`${pin?.image.asset.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className="transition-all border border-gray-300 hover:border-gray-900 bg-white rounded-md flex items-center justify-center
          px-3 py-2  hover:fill-gray-900"
          >
            <AiOutlineDownload />
          </a>
        </div>
      </div>
      <div className="px-5">
        <div className="max-w-2xl mx-auto">
          <img
            src={urlFor(pin?.image)?.url()}
            alt="Image"
            className="w-full transition-all group-hover:brightness-75"
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const pin = await getPinById(ctx.query.id as string);
  console.log(pin);

  return {
    props: {
      user: session?.user,
      id: session?.id,
      pin,
    },
  };
}

export default PhotoDetail;
