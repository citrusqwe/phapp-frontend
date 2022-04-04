import React from 'react';
import MasonryLayout from './MasonryLayout';
import EmptySvg from '../public/empty.svg';

export interface FeedProps {
  pins: {
    _id: string;
    destination: string;
    image: { asset: { url: string } };
    postedBy: {
      _id: string;
      username: string;
      image: string;
    };
  }[];
}

const Feed: React.FC<FeedProps> = ({ pins }) => {
  if (pins.length < 1)
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <img src={EmptySvg.src} alt="Nothing here" className="w-[500px] mb-6" />
        <p>There is no results for your search!</p>
      </div>
    );

  return <div className="px-8">{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
