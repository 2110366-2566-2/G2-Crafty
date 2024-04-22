'use client';

import { SidebarData, User } from '@/app/_common/interface/chat';
import userStore from '@/app/_common/store/user/user-store';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
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
  userData?: User[];
}

const UserModal: FC<SkipModalProps> = ({
  onBack = () => {},
  onCancel = () => {},
  title = 'Title',
  description = '---     Select user to chat with     ---',
  actionButtonText = 'Aciton',
  cancelButtonText = 'Back',
  positiveAction = false,
  blurBackground = true,
  userData = [],
}) => {
  const myId = userStore((state) => state.user.id);
  const createChatroomWithUser = async (userId: string) => {
    const response = await apiService.createNewChatroom({ crafterId: myId, crafteeId: userId });
    if (response.status === ApiStatus.SUCCESS) {
      window.location.href = `/chats/${response.data.id}`;
    }
  };

  return (
    <>
      <div className="absolute z-[500] h-[calc(100vh-64px)] w-full">
        <div
          className={`flex h-full w-full items-center justify-center ${blurBackground && 'backdrop-blur-sm'}`}>
          <div className="flex max-h-[calc(100vh-84px)] min-w-[350px] flex-col items-center justify-center place-self-center overflow-hidden rounded-lg bg-white p-6 shadow-xl">
            <h1 className="mb-4 text-xl font-semibold text-gray-700">{title}</h1>
            <p className="mb-6 text-gray-500">{description}</p>
            <div className="my-3 flex flex-col gap-4 overflow-y-auto">
              {userData.map((user) => {
                return (
                  <div
                    key={user.id}
                    onClick={() => {
                      createChatroomWithUser(user.id);
                    }}
                    className="flex w-full gap-4 rounded-lg bg-slate-100 px-3 py-2 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300">
                    <div title={user.id} className="flex w-[100px] justify-center">
                      {user.username}
                    </div>
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

export default UserModal;
