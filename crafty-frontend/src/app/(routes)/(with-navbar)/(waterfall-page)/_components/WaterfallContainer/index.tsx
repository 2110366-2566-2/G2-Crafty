'use client';

import { FC, useEffect } from 'react';
import FeedCard from './_components/FeedCard';
import useFeedList from '../../../_hooks/allFeed';
import LoadingPage from '@/app/_components/common-component/loading';
import { useEnableSearchOnNavbar } from '../../../_hooks/searchOnNavbar/enableSearchOnNavbar';
import searchStore from '../../../_hooks/searchOnNavbar/stores/search';

const WaterfallContainer: FC = () => {
  useEnableSearchOnNavbar();
  const search = searchStore((state) => state.search);
  const { init, posts } = useFeedList(search);

  if (!init) return <LoadingPage />;

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 gap-x-2 p-4 max-lg:px-2 lg:gap-x-4 lg:gap-y-4">
      {posts.length === 0 && (
        <div className="col-span-3 mx-auto flex h-20 w-full items-center justify-center">
          <p className="text-3xl text-gray-500">ไม่พบโพสต์</p>
        </div>
      )}
      {Array.from({ length: 3 }).map((_, i) => {
        let currentPosts = [];
        for (let j = i; j < posts.length; j += 3) {
          currentPosts.push(posts[j]);
        }

        return (
          <div className="flex flex-col  gap-y-2 lg:gap-4" key={i}>
            {currentPosts.map((post) => (
              <FeedCard key={post.id} post={post} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default WaterfallContainer;
