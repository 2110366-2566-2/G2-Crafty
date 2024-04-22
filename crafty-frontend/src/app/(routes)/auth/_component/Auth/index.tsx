'use client';

import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';
import { useState } from 'react';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const response = await apiService.login(username, password);
    if (response.status === ApiStatus.ERROR) return false;
    window.location.href = '/admin';
  };

  return (
    <div className="absolute left-1/2 top-1/2 h-fit max-h-[90vh] w-fit min-w-[350px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 transform rounded-md border-[1px] p-[24px]">
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          login();
        }}>
        Login
      </button>
    </div>
  );
};

export default AuthPage;
