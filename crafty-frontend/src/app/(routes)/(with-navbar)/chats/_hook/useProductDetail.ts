'use client';

import {
  ChatroomDetail,
  ProductDetail,
  ReadChatroom,
  SidebarData,
} from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useEffect, useState } from 'react';

const useProductDetail = (productId: string) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await apiService.getProductDetail(productId);
      if (response.status === ApiStatus.SUCCESS) setProductDetail(response.data);
      console.log('product fetch');
    };
    fetchProductDetail();
    const intervalId = setInterval(fetchProductDetail, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  return productDetail;
};

export default useProductDetail;
