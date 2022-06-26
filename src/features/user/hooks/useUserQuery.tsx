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

export const useUserQuery = () => {
  const { store } = useFireBase();
  const [_collection] = useState(
    collection(store, 'users') as CollectionReference<UserInfo>,
  );

  const upsertUser = useCallback(
    (userInfo: UserInfo) => {
      const usersDocument = doc(
        store,
        'users',
        userInfo.uid,
      ) as DocumentReference<UserInfo>;
      setDoc(usersDocument, userInfo);
    },
    [store],
  );

  const getUsers = useCallback(
    async (email: string) => {
      const _query = query(_collection, where('email', '==', email));
      const snapshot = await getDocs(_query);

      return snapshot.docs.map((el) => el.data());
    },
    [_collection],
  );

  return { upsertUser, getUsers };
};
