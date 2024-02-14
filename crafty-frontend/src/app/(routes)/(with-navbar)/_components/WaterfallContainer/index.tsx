'use client';

import Image from 'next/image';
import { FC } from 'react';
import FeedCard from './_compoents/FeedCard';

const WaterfallContainer: FC = () => {
  return (
    <div className="grid w-full grid-cols-6 gap-x-4 gap-y-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => {
        return (
          <div className="flex flex-col gap-4" key={i}>
            {Array.from({ length: 10 }).map((_, i) => {
              return <FeedCard key={i} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WaterfallContainer;
