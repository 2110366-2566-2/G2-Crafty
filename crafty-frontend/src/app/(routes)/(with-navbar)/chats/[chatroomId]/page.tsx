'use client';

import { FC, useState } from 'react';
import MessageBubble from '../_component/MessageBubble';
import ChatHeader from '../_component/ChatHeader';
import ChatInput from '../_component/ChatInput';
import { ChatroomDetail, Message } from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import useChatroomDetail from '../_hook/useChatroomDetail';
import ProductSidebar from '../_component/ProductSidebar';
type PageProps = {
  params: {
    chatroomId: string;
  };
};

const ChatRoomPage: FC<PageProps> = ({ params }) => {
  const { chatroomDetail, productDetail } = useChatroomDetail(params.chatroomId);
  const myId = userStore((state) => state.user.id);
  const myName = userStore((state) => state.user.username);

  const messages = chatroomDetail?.messages;

  const talkerName =
    chatroomDetail?.crafter.username === myName
      ? chatroomDetail?.craftee.username
      : chatroomDetail?.crafter.username;
  const senderName =
    chatroomDetail?.crafter.username === myName
      ? chatroomDetail?.crafter.username
      : chatroomDetail?.craftee.username;

  const isCrafter = chatroomDetail?.crafterId === myId;
  const postId = chatroomDetail?.postId || null;
  const isOtherChat = chatroomDetail?.crafterId !== myId && chatroomDetail?.crafteeId !== myId;

  return (
    <div className="flex w-full flex-row overflow-x-hidden">
      <div className="relative flex h-full w-full">
        <div className="mr-2 flex h-full min-h-[calc(100vh-64px)] w-full flex-col pr-3">
          <ChatHeader
            name={
              isOtherChat ? (talkerName ? `${talkerName} - ${senderName}` : '.') : talkerName ?? ''
            }
          />

          <div className="flex-1 flex-col space-y-4 overflow-y-auto py-4">
            {messages?.map((message: Message) => {
              return (
                <MessageBubble
                  key={message.id}
                  message={message.content}
                  messageType={message.messageType}
                  isFromCurrentUser={message.senderId === myId}
                  date={message.date}
                />
              );
            })}
          </div>
          <ChatInput chatroomId={params.chatroomId} senderId={myId} />
        </div>
        <ProductSidebar
          product={productDetail}
          chatroomId={params.chatroomId}
          isCrafter={isCrafter}
          postId={postId}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
