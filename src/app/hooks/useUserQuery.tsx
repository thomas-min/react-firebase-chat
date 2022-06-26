import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { RESOURCES } from '~/app/configs/resources';
import { getFirebase } from '~/app/utils/firebase';
import { User } from '~/app/types';

export const useUserQuery = () => {
  const { store, auth } = getFirebase();
  const _collection = useMemo(
    () => collection(store, RESOURCES.USERS) as CollectionReference<User>,
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

  const getUser = useCallback(
    async (uid: string): Promise<User | undefined> => {
      const _document = doc(
        store,
        RESOURCES.USERS,
        uid,
      ) as DocumentReference<User>;
      const snapshot = await getDoc(_document);

      return snapshot.data();
    },
    [store],
  );

  return { getUsers, getUser };
};
