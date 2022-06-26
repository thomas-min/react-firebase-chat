import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useMemo } from 'react';

export const useFireBase = () => {
  const app = useMemo(() => getApp(), []);
  const store = useMemo(() => getFirestore(app), [app]);
  const auth = useMemo(() => getAuth(app), [app]);

  return { app, store, auth };
};
