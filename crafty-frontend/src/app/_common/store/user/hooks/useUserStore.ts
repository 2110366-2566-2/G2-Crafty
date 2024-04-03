'use client';

import { useEffect } from 'react';
import userStore from '../user-store';

const useUserStore = () => {
  const initUser = userStore((state) => state.initUser);
  const isUserInit = userStore((state) => state.isUserInit);
  const isAuth = userStore((state) => state.isAuth);
  if (isUserInit && !isAuth) window.location.href = '/login';

  useEffect(() => {
    initUser();
  }, [initUser]);
};

export default useUserStore;
