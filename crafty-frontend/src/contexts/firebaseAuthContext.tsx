'use client';

// FirebaseAuthContext.tsx
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebaseApp, { auth } from '@/configs/firebaseConfig';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextState = { user: User | null };

// const auth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext<ContextState>({ user: null });

const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider, useFirebaseAuthContext, FirebaseAuthContext };
