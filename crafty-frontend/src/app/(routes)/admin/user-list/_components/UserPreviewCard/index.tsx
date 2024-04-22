import useMyFeed from '@/app/(routes)/(with-navbar)/_hooks/myFeed';
import { Post } from '@/app/_common/interface/post';
import { User } from '@/app/_common/interface/user';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface UserPreviewCardProps {
  user: User;
}
const UserPreviewCard = ({ user }: UserPreviewCardProps) => {
  return (
    <div className="flex h-fit w-full flex-row items-center gap-4 rounded-lg bg-white p-4 px-6">
      {/* title and price */}
      <div className="flex flex-col gap-2">
        <span className="text-xl">
          {user.username} <span className="text-sm">#{user.id}</span>
        </span>
        <span className="text-xl font-bold">{user.role}</span>
      </div>
    </div>
  );
};

export default UserPreviewCard;
