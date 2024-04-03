import { apiService } from '@/configs/apiService/apiService';
import { PostForm } from '../types';

const editFeedHook = (feedId: string) => {
  const updateFeedByForm = (feedForm: PostForm) => {
    const response = apiService.updatePost(feedId, {
      photoUrl: feedForm.photoUrl,
      title: feedForm.title,
      detail: feedForm.detail,
      content: feedForm.content,
      price: feedForm.price,
    });
  };

  return {
    updateFeedByForm,
  };
};

export default editFeedHook;
