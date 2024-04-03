import { MessageType } from '@/app/_common/interface/chat';
import { formatDateTime } from '@/app/_common/utils/chatting';
import React from 'react';

interface MessageBubbleProps {
  message: string;
  isFromCurrentUser: boolean;
  date: string;
  messageType: MessageType | string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isFromCurrentUser,
  date,
  messageType,
}) => {
  const formattedDate = formatDateTime(date);

  // return 2 different version based on 'isFromCurrentUser'
  const commonClasses1 = 'flex flex-col px-4';
  const commonClasses2 = 'flex max-w-[1000px] flex-wrap break-all rounded-md px-4 py-2';
  const rightSideClasses1 = commonClasses1 + ' pl-10';
  const rightSideClasses2 = commonClasses2 + ' ml-auto bg-ct_gray-200';
  const leftSideClasses1 = commonClasses1 + '';
  const leftSideClasses2 = commonClasses2 + ' mr-auto bg-ct_gray-100';
  const thisClasses1 = isFromCurrentUser ? rightSideClasses1 : leftSideClasses1;
  const thisClasses2 = isFromCurrentUser ? rightSideClasses2 : leftSideClasses2;
  const thisClasses3 = isFromCurrentUser ? 'ml-auto' : 'mr-auto';

  if (messageType === 'IMAGE') {
    return (
      <div className={thisClasses1}>
        <div className={thisClasses2}>
          <img src={message} className="h-auto max-h-72 max-w-full rounded-md" />
        </div>
        <div className={`${thisClasses3} mr-1 mt-1 flex text-xs`}>{formattedDate}</div>
      </div>
    );
  } else {
    return (
      <div className={thisClasses1}>
        <div className={thisClasses2}>{message}</div>
        <div className={`${thisClasses3} mr-1 mt-1 flex text-xs`}>{formattedDate}</div>
      </div>
    );
  }
};

export default MessageBubble;
