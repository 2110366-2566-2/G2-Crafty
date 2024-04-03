import { apiService } from '@/configs/apiService/apiService';
import { PostForm } from '../types';

const createFeedHook = () => {
  const createFeedByForm = async (feedForm: PostForm) => {
    const response = await apiService.createPost({
      photoUrl: feedForm.photoUrl,
      title: feedForm.title,
      detail: feedForm.detail,
      content: feedForm.content,
      price: feedForm.price,
    });
  };

  return {
    createFeedByForm,
  };
};

export default createFeedHook;
