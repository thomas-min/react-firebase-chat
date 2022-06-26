import { UserInfo } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { useFireBase } from '~/app/hooks/useFirebase';

export const useUser = () => {
  const { store } = useFireBase();

  const [usersCollection] = useState(collection(store, 'users') as CollectionReference<UserInfo>);

  const upsertUser = useCallback(
    (userInfo: UserInfo) => {
      const usersDocument = doc(store, 'users', userInfo.uid) as DocumentReference<UserInfo>;
      setDoc(usersDocument, userInfo);
    },
    [store],
  );

  const getUsers = useCallback(
    async (email: string) => {
      const usersQuery = query(usersCollection, where('email', '==', email));
      const usersSnapshot = await getDocs(usersQuery);

      return usersSnapshot.docs.map((el) => el.data());
    },
    [usersCollection],
  );

  return { upsertUser, getUsers };
};
