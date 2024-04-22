'use client';

import React, { useEffect, useMemo, useState } from 'react';
import SidebarBubble from './_component/SidebarBubble';
import { PostChatroom, SidebarData, User } from '@/app/_common/interface/chat';
import useSidebarDatas from './_hook/useSidebarDatas';
import { Button } from '@/app/_components/ui/input';
import { apiService } from '@/configs/apiService/apiService';
import userStore from '@/app/_common/store/user/user-store';
import ChatroomModal from '@/app/_components/modal/chatroomModal';
import { ApiStatus } from '@/configs/apiService/types';
import UserModal from '@/app/_components/modal/userModal';

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [refreshSidebar, setRefreshSidebar] = useState(false);
  const sidebarDatas = useSidebarDatas(refreshSidebar);

  const me = userStore((state) => state.user);
  const myId = me.id;
  const myName = me.username;
  const myRole = me.role;

  const [showChatroomModal, setShowChatroomModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (myRole === 'ADMIN') {
      const fetchUsers = async () => {
        const response = await apiService.getUsers();
        if (response.status === ApiStatus.SUCCESS) {
          const nonAdminUsers = response.data.filter((user) => user.role !== 'ADMIN');
          setUsers(nonAdminUsers);
        }
      };
      fetchUsers();
    }
  }, [showUserModal]);

  const sortedSidebarDatas = useMemo(() => {
    return [...sidebarDatas]
      .filter((a) => {
        return a.myName === myName;
      })
      .sort((a, b) => {
        return new Date(b.lastChatTime).getTime() - new Date(a.lastChatTime).getTime();
      });
  }, [sidebarDatas]);

  const adminId = process.env.CRAFTEE_ADMIN_ID || 'admin_id';

  const createChatroomWithAdmin = async () => {
    if (adminId === myId) return;

    const postChatroom: PostChatroom = {
      crafterId: adminId,
      crafteeId: myId,
    };
    const response = await apiService.createNewChatroom(postChatroom);

    if (response.status === 'SUCCESS') {
      window.location.href = `/chats/${response.data.id}`;
    }
  };

  const browseAllChatroom = () => {
    setShowChatroomModal(true);
  };

  const browseAllUser = async () => {
    setShowUserModal(true);
  };

  return (
    <div className="flex max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] w-full">
      {showChatroomModal && (
        <ChatroomModal
          title="Chatroom List"
          onBack={() => setShowChatroomModal(false)}
          chatroomData={sidebarDatas}
        />
      )}
      {showUserModal && (
        <UserModal title="User List" onBack={() => setShowUserModal(false)} userData={users} />
      )}
      <aside className="flex w-[300px] flex-col gap-2 bg-ct_brown-100 pt-4" aria-label="Sidebar">
        <div className="mb-2 flex justify-center border-b pb-4 font-semibold">
          {myId == adminId ? 'Admin ' : ''}Chat History
        </div>
        <div className="flex h-full flex-col justify-between overflow-y-auto pb-5">
          <div className="flex flex-1 flex-col gap-2">
            {sortedSidebarDatas.map((sidebarData: SidebarData) => {
              return (
                <SidebarBubble
                  key={sidebarData.chatroomId}
                  talkerName={sidebarData.talkerName}
                  lastChatTime={sidebarData.lastChatTime}
                  chatroomId={sidebarData.chatroomId}
                  isAdmin={sidebarData.isAdmin}
                  isRead={sidebarData.isRead}
                  myName={sidebarData.myName}
                />
              );
            })}
          </div>
          {myId !== adminId && (
            <div className="mt-10 flex justify-center">
              <Button
                className="max-h-[34px] max-w-[140px] bg-ct_brown-400 text-sm font-medium"
                onClick={createChatroomWithAdmin}>
                Contact Admin
              </Button>
            </div>
          )}
          {myId == adminId && (
            <div className="mt-10 flex justify-center gap-4">
              <Button
                className="max-h-[34px] max-w-[150px] bg-ct_brown-400 text-sm font-medium"
                onClick={browseAllChatroom}>
                Select Chatroom
              </Button>
              <Button
                className="max-h-[34px] max-w-[110px] bg-ct_brown-400 text-sm font-medium"
                onClick={browseAllUser}>
                Select User
              </Button>
            </div>
          )}
        </div>
      </aside>
      <section className="h-full w-full flex-1">
        {children} {/* This is your main content area */}
      </section>
    </div>
  );
};

export default ChatLayout;
