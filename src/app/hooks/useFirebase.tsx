import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useState } from 'react';

export const useFireBase = () => {
  const [app] = useState(getApp());
  const [store] = useState(getFirestore(getApp()));
  const [auth] = useState(getAuth(getApp()));

  return { app, store, auth };
};
