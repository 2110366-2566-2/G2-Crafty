import { Post } from '@/app/_common/interface/post';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { apiClient } from '@/configs/axiosConfig';
import { useState, useEffect } from 'react';

const useMyFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setInit(false);
        const response = await apiService.getMyPosts();
        if (response.status === ApiStatus.SUCCESS) {
          setPosts(response.data ?? []);
        }
        setInit(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const updateLocalPost = (post: Post) => {
    const newPosts = posts.map((p) => (p.id === post.id ? post : p));
    setPosts(newPosts);
  };

  return { posts, init, updateLocalPost };
};

export default useMyFeed;
