'use client';

import { User } from '@/app/_common/interface/user';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { FC, useEffect, useState } from 'react';
import UserPreviewCard from './_components/UserPreviewCard';

const HomePage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.adminGetUsers();
        if (response.status === ApiStatus.SUCCESS) {
          setUsers(response.data ?? []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 p-8">
      <div className="mx-auto grid h-fit w-full max-w-[1300px] gap-6">
        <div className="flex justify-between">
          <span className="text-3xl font-bold">ผู้ใช้งานทั้งหมด</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          {users.map((user, i) => (
            <UserPreviewCard user={user} key={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
