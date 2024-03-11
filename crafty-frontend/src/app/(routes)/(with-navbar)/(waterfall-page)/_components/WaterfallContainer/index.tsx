'use client';

import { FC, useEffect, useState } from 'react';
import FeedCard from './_components/FeedCard';
import { apiClient } from '@/configs/axiosConfig';
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext';
import { Post } from '@/common/interface/post';

const WaterfallContainer: FC = () => {
  const user = useFirebaseAuthContext();

  const [posts, setPosts] = useState<Post[]>([]);

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setInit(false);
        const response = await apiClient.get('/post/list');
        if (response?.data?.post && response?.data?.post.length > 0) {
          setPosts(response.data.post);
        }
        setInit(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) fetchPosts();
  }, [user]);

  if (!init)
    return (
      <div className="flex h-fit w-full flex-col items-center justify-center pt-[50px]">
        <span className="text-3xl text-ct_brown-500">กำลังโหลดข้อมูล...</span>
      </div>
    );

  if (init && posts.length === 0)
    return (
      <div className="flex h-fit w-full flex-col items-center justify-center pt-[50px]">
        <span className="text-3xl text-ct_brown-500">ไม่พบผลลัพธ์</span>
        <svg
          className="mb-[-40px] mt-[-40px]"
          width="600"
          height="450"
          viewBox="0 0 868 607"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="868" height="607" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use
                xlinkHref="#image0_75_369"
                transform="matrix(0.00153357 0 0 0.00219298 0.0337942 0)"
              />
            </pattern>
            <image
              id="image0_75_369"
              width="608"
              height="456"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <span className="flex flex-col gap-2 text-center text-xl text-ct_brown-500">
          <span>กรุณาเข้าสู่ระบบเพื่อดูสินค้า</span>
          <a href="/login" className="text-ct_blue-600 underline">
            เข้าสู่ระบบ
          </a>
          {/* ไม่พบสินค้าที่คุณกำลังค้นหา
          <br />
          ลองใช้คำอื่น ๆ ในการค้นหา */}
        </span>
      </div>
    );

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 gap-x-2 p-4 max-lg:px-2 lg:gap-x-4 lg:gap-y-4">
      {Array.from({ length: 3 }).map((_, i) => {
        let currentPosts = [];
        for (let j = i; j < posts.length; j += 3) {
          currentPosts.push(posts[j]);
        }

        return (
          <div className="flex flex-col  gap-y-2 lg:gap-4" key={i}>
            {currentPosts.map((post) => (
              <FeedCard key={post.ID} post={post} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default WaterfallContainer;
