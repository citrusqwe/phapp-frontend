import React from 'react';
import Masonry from 'react-masonry-css';
import { FeedProps } from './Feed';
import Pin from './Pin';

const breakpoints = {
  default: 4,
  // 3000: 6,
  // 2000: 5,
  // 1200: 3,
  // 1000: 2,
  // 500: 1,
};

const MasonryLayout: React.FC<FeedProps> = ({ pins }) => {
  return (
    <Masonry
      className="flex w-auto animate-slide-fwd -ml-8"
      columnClassName="pl-6 bg-clip-padding"
      breakpointCols={breakpoints}
    >
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
