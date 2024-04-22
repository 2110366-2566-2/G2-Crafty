'use client';

import { FC, useEffect, useState } from 'react';
import FeedPreviewCard from './_components/FeedPreviewCard';
import { Post } from '@/app/_common/interface/post';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';

const PostListPage: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.adminGetPosts();
        if (response.status === ApiStatus.SUCCESS) {
          setPosts(response.data ?? []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] gap-6">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">โพสทั้งหมด</span>
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

export default PostListPage;
