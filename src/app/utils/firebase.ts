import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const getFirebase = () => {
  const app = getApp();
  const store = getFirestore(app);
  const auth = getAuth(app);

  return { app, store, auth };
};
