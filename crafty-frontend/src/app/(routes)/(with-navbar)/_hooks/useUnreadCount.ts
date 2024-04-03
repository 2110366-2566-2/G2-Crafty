'use client';

import { ReadChatroom, SidebarData } from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useEffect, useState } from 'react';

const useUnreadCount = (): Number => {
  const myName = userStore((state) => state.user.username);

  const [chatrooms, setChatrooms] = useState<ReadChatroom[]>([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const response = await apiService.getChatrooms();
      if (response.status === ApiStatus.SUCCESS) setChatrooms(response.data);
    };
    fetchChatrooms();
  }, []);

  let count = 0;

  chatrooms.forEach((chatroom) => {
    if (myName === chatroom.craftee.username) {
      if (chatroom.isCrafteeRead === false) count++;
    }
    if (myName === chatroom.crafter.username) {
      if (chatroom.isCrafterRead === false) count++;
    }
  });

  return count;
};

export default useUnreadCount;
