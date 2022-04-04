import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { urlFor } from '../client';

interface PinProps {
  pin: {
    _id: string;
    destination: string;
    image: { asset: { url: string } };
    postedBy: {
      _id: string;
      username: string;
      image: string;
    };
  };
}

const Pin: React.FC<PinProps> = ({ pin }) => {
  // if (!pin) return <p>Nothing</p>;

  return (
    <Link href={`/?id=${pin._id}`} as={`/photos/${pin._id}`}>
      <a className="block relative group">
        <img
          src={urlFor(pin?.image)?.url()}
          alt="Image"
          className="w-full transition-all group-hover:brightness-75"
        />
        <div className="absolute w-full px-4 bottom-3 left-0 opacity-0 group-hover:opacity-100 transition-all">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src={pin?.postedBy.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={pin?.postedBy.username}
                />
                <span className="ml-3 text-white">
                  {pin?.postedBy.username}
                </span>
              </a>
            </Link>
            <a
              href={`${pin?.image.asset.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-md flex items-center justify-center
            px-3 py-2 hover:fill-gray-900"
            >
              <AiOutlineDownload />
            </a>
          </div>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
          <button
            className="bg-white rounded-md flex items-center justify-center
          px-3 py-2 hover:fill-gray-900"
          >
            <FaPlus className="fill-gray-500 " />
          </button>
        </div>
      </a>
    </Link>
  );
};

export default Pin;
