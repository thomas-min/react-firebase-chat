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
import { useCallback, useMemo } from 'react';
import { useFireBase } from '~/app/hooks/useFirebase';
import { User } from '~/types';

export const useUserQuery = () => {
  const { store, auth } = useFireBase();
  const _collection = useMemo(
    () => collection(store, 'users') as CollectionReference<User>,
    [store],
  );

  const upsertUser = useCallback(
    (user: User): void => {
      const _document = doc(
        store,
        'users',
        user.uid,
      ) as DocumentReference<User>;
      setDoc(_document, user);
    },
    [store],
  );

  const getUsers = useCallback(
    async (email: string): Promise<User[]> => {
      const _query = query(_collection, where('email', '==', email));
      const _snapshot = await getDocs(_query);

      return _snapshot.docs
        .map((el) => el.data())
        .filter((el) => el.email !== auth.currentUser?.email);
    },
    [_collection, auth.currentUser?.email],
  );

  return { upsertUser, getUsers };
};
