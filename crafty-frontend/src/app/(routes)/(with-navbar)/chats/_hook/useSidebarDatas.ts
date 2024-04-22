'use client';

import { ReadChatroom, SidebarData } from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useEffect, useState } from 'react';

const useSidebarDatas = (refreshSidebar: boolean): SidebarData[] => {
  const myName = userStore((state) => state.user.username);

  const [chatrooms, setChatrooms] = useState<ReadChatroom[]>([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const response = await apiService.getChatrooms();
      if (response.status === ApiStatus.SUCCESS) setChatrooms(response.data);
    };
    fetchChatrooms();
  }, [refreshSidebar]);

  return chatrooms.map((chatroom: ReadChatroom) => {
    const isOtherCrafter = chatroom.crafter.username !== myName;
    const isAdmin = isOtherCrafter && chatroom.crafter.role === 'ADMIN';
    const isRead = isOtherCrafter ? chatroom.isCrafteeRead : chatroom.isCrafterRead;
    return {
      talkerName:
        chatroom.crafter.username === myName
          ? chatroom.craftee.username
          : chatroom.crafter.username,
      lastChatTime: chatroom.lastChatTime,
      chatroomId: chatroom.id,
      isAdmin: isAdmin,
      isRead: isRead,
      myName: isOtherCrafter ? chatroom.craftee.username : chatroom.crafter.username,
      postId: chatroom.postId,
    };
  });
};

export default useSidebarDatas;
