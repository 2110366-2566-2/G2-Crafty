'use client';

import { ReadChatroom, SidebarData } from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useEffect, useState } from 'react';

const useSidebarDatas = (): SidebarData[] => {
  const myName = userStore((state) => state.user.username);

  const [chatrooms, setChatrooms] = useState<ReadChatroom[]>([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const response = await apiService.getChatrooms();
      if (response.status === ApiStatus.SUCCESS) setChatrooms(response.data);
    };
    fetchChatrooms();
  }, []);

  return chatrooms.map((chatroom: ReadChatroom) => {
    return {
      talkerName:
        chatroom.crafter.username === myName
          ? chatroom.craftee.username
          : chatroom.crafter.username,
      lastChatTime: chatroom.lastChatTime,
      chatroomId: chatroom.id,
    };
  });
};

export default useSidebarDatas;
