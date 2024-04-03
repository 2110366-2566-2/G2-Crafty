import { Post } from '@/app/_common/interface/post';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useState, useEffect } from 'react';

const useFeedDetail = (feedId: string) => {
  const [post, setPost] = useState<Post>();

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setInit(false);

        const response = await apiService.getPost(feedId);
        if (response.status === ApiStatus.SUCCESS) {
          setPost(response.data);
        }

        setInit(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [feedId]);

  return { post, init };
};

export default useFeedDetail;
