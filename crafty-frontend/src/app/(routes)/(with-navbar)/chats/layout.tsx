'use client';

import React, { useMemo } from 'react';
import SidebarBubble from './_component/SidebarBubble';
import { SidebarData } from '@/app/_common/interface/chat';
import useSidebarDatas from './_hook/useSidebarDatas';

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const sidebarDatas = useSidebarDatas();

  const sortedSidebarDatas = useMemo(() => {
    return [...sidebarDatas].sort((a, b) => {
      return new Date(b.lastChatTime).getTime() - new Date(a.lastChatTime).getTime();
    });
  }, [sidebarDatas]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full">
      <aside className="flex w-[300px] flex-col gap-2 bg-ct_brown-100 pt-4" aria-label="Sidebar">
        <div className="mb-2 flex justify-center border-b pb-4 font-semibold">Chat History</div>
        {sortedSidebarDatas.map((sidebarData: SidebarData) => {
          return (
            <SidebarBubble
              key={sidebarData.chatroomId}
              talkerName={sidebarData.talkerName}
              lastChatTime={sidebarData.lastChatTime}
              chatroomId={sidebarData.chatroomId}
            />
          );
        })}
      </aside>
      <section className="h-full w-full flex-1">
        {children} {/* This is your main content area */}
      </section>
    </div>
  );
};

export default ChatLayout;
