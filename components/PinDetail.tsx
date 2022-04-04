import React from 'react';
import Link from 'next/link';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';
import { getPinById, getRelatedPins, urlFor } from '../client';
import useSWR from 'swr';

interface PinDetailProps {
  id: string | string[] | undefined;
}

const fetchPin = (id: string) => getPinById(id);
const fetchRelatedPhotos = (tags: { text: string }[], id: string) =>
  getRelatedPins(tags, id);

const PinDetail: React.FC<PinDetailProps> = ({ id }) => {
  const { data: pin, error: pinError } = useSWR(id, fetchPin);
  const { data: relatedPhotos, error: relatedPhotosError } = useSWR(
    [pin?.tags, id],
    fetchRelatedPhotos
  );

  console.log(relatedPhotos);

  if (pinError) return <div>Failed to load</div>;
  if (!pin) return <div>Loading...</div>;

  return (
    <div className="py-4">
      <div className="flex justify-between items-center px-4 mb-10">
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
        <div className="max-w-2xl mx-auto mb-10">
          <img
            src={urlFor(pin?.image)?.url()}
            alt="Image"
            className="w-full transition-all group-hover:brightness-75"
          />
        </div>
        <div className="flex items-center mb-5">
          <span className="mr-4">Tags:</span>
          <div className="flex items-center">
            {pin?.tags.map((tag: any) => (
              <Link href={`/c/${tag.text}`} key={tag._id}>
                <a className="py-1 px-2 bg-slate-200 rounded-md mr-3">
                  {tag.text}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <span>Related photos</span>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
