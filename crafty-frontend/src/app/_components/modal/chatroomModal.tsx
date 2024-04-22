'use client';

import { SidebarData } from '@/app/_common/interface/chat';
import { FC, useEffect, useRef } from 'react';

interface SkipModalProps {
  title?: string;
  description?: string;
  actionButtonText?: string;
  cancelButtonText?: string;
  onBack?: () => void;
  onCancel?: () => void;
  positiveAction?: boolean;
  blurBackground?: boolean;
  chatroomData?: SidebarData[];
  postId?: string | null;
}

const ChatroomModal: FC<SkipModalProps> = ({
  onBack = () => {},
  onCancel = () => {},
  title = 'Title',
  description = '--- All active chatrooms, Select to navigate ---',
  actionButtonText = 'Aciton',
  cancelButtonText = 'Back',
  positiveAction = false,
  blurBackground = true,
  chatroomData = [],
  postId,
}) => {
  return (
    <>
      <div className="absolute z-[500] h-[calc(100vh-64px)] w-full">
        <div
          className={`flex h-full w-full items-center justify-center ${blurBackground && 'backdrop-blur-sm'}`}>
          <div className="flex max-h-[calc(100vh-84px)] flex-col items-center justify-center place-self-center overflow-hidden rounded-lg bg-white p-6 shadow-xl">
            <h1 className="mb-4 text-xl font-semibold text-gray-700">{title}</h1>
            <p className="mb-6 text-gray-500">{description}</p>
            <div className="my-3 flex flex-col gap-4 overflow-y-auto">
              {chatroomData.map((chatroom) => {
                return (
                  <div
                    key={chatroom.chatroomId}
                    title={`Chatroom:  ${chatroom.chatroomId}`}
                    onClick={() => {
                      window.location.href = `/chats/${chatroom.chatroomId}`;
                    }}
                    className="flex w-full gap-4 rounded-lg bg-slate-100 px-3 py-2 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div className="w-20">{chatroom.talkerName}</div>
                    <div>-</div>
                    <div>{chatroom.myName}</div>
                    {chatroom.postId && (
                      <div className="ml-2">
                        (Post: <span className="font-semibold">{chatroom.postId}</span>)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex w-full justify-center gap-6">
              <button
                className="w-full max-w-[100px] rounded-full bg-ct_gray-200 px-1 py-2 text-white outline-none transition-all duration-150 ease-linear hover:bg-ct_gray-300 hover:text-white"
                type="button"
                onClick={onBack}>
                {cancelButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatroomModal;
