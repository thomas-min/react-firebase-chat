import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import { useFireBase } from '~/app/hooks/useFirebase';
import { Room, User } from '~/types';

export const useRoomQuery = () => {
  const { store, auth } = useFireBase();
  const [_collection] = useState(
    collection(store, 'rooms') as CollectionReference<Room>,
  );

  const getRoom = useCallback(
    async (id: string): Promise<Room | undefined> => {
      const reference = doc(store, 'rooms', id) as DocumentReference<Room>;
      const snapshot = await getDoc(reference);

      if (snapshot.exists()) return snapshot.data();
    },
    [store],
  );

  const getAllRooms = useCallback(async (): Promise<Room[] | undefined> => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.providerData[0].uid;

    const reference = collection(
      store,
      `users/${uid}/subscriptions`,
    ) as CollectionReference<Room>;
    const snapshot = await getDocs(reference);

    return snapshot.docs.map((doc) => doc.data());
  }, [auth.currentUser, store]);

  const createRoom = useCallback(
    async (user: User): Promise<Room | undefined> => {
      // TODO: implement duplicate room check

      if (!auth.currentUser) return;

      const currentUser = auth.currentUser.providerData[0];

      const uid = uuid();
      const _document = doc(store, 'rooms', uid) as DocumentReference<Room>;
      const _room = {
        uid,
        users: [user, currentUser],
        messages: [],
      };

      setDoc(_document, _room);

      const room = await getRoom(uid);

      return room;
    },
    [auth.currentUser, getRoom, store],
  );

  return { createRoom, getRoom, getAllRooms };
};
