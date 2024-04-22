'use client';

import { SidebarData } from '@/app/_common/interface/chat';
import { formatDateTime } from '@/app/_common/utils/chatting';
import { useRouter } from 'next/navigation';

const SidebarBubble = ({ talkerName, lastChatTime, chatroomId, isAdmin, isRead }: SidebarData) => {
  const router = useRouter();

  const handleClick = () => {
    // navigate to the chatroom
    console.log(chatroomId);
    router.push(`/chats/${chatroomId}`);
  };

  return (
    <div className="px-4 py-2 hover:cursor-pointer hover:bg-ct_gray-100" onClick={handleClick}>
      <div className="text-xs text-ct_gray-600">{formatDateTime(lastChatTime)}</div>
      <div className={`text-sm ${isRead ? '' : 'font-bold'}`}>
        <span className="mr-1 font-semibold">{isAdmin ? '(Admin)' : ''}</span>
        {talkerName}
      </div>
    </div>
  );
};

export default SidebarBubble;
