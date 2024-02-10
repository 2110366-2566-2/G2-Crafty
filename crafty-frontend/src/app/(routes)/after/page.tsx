'use client';

import React from 'react';
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext';

const Page = () => {
  const { user } = useFirebaseAuthContext();
  return (
    <>
      {user && (
        <div>
          <div>{user.email}</div>
          <div>{user.uid}</div>
        </div>
      )}
    </>
  );
};

export default Page;
