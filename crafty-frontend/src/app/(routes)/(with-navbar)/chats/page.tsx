'use client';

import { FC } from 'react';
import ProductSidebar from './_component/ProductSidebar';

const ChatsPage: FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <div className="font-bold">... Start Chatting by selecting the chat ...</div>
      <ProductSidebar />
    </div>
  );
};

export default ChatsPage;
