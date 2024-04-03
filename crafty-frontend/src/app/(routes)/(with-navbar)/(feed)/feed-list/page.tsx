'use client';

import { FC } from 'react';
import FeedPreviewCard from './_components/FeedPreviewCard';
import LoadingPage from '@/app/_components/common-component/loading';
import useMyFeed from '../../_hooks/myFeed';

const FeedListPage: FC = () => {
  const { init, posts } = useMyFeed();

  if (!init) return <LoadingPage />;

  return (
    <div className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] gap-6">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">โพสต์ของฉัน</span>
          <button
            className="btn btn-circle rounded-full !border-none bg-ct_brown-200 hover:bg-ct_brown-300"
            onClick={() => {
              window.location.href = '/feed-create';
            }}>
            +
          </button>
        </div>
        <div className="flex w-full flex-col gap-2">
          {posts.map((post, i) => (
            <FeedPreviewCard post={post} key={`feed ${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedListPage;
