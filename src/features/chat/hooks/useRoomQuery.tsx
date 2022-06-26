import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { useFireBase } from '~/app/hooks/useFirebase';
import { Room, User } from '~/types';

export const useRoomQuery = () => {
  const { store, auth } = useFireBase();

  const getRoom = useCallback(
    async (id: string): Promise<Room | undefined> => {
      const reference = doc(store, 'rooms', id) as DocumentReference<Room>;
      const snapshot = await getDoc(reference);

      if (snapshot.exists()) return snapshot.data();
    },
    [store],
  );

  const getAllRooms = useCallback(async (): Promise<Room[] | undefined> => {
    // TODO: implement pagination

    if (!auth.currentUser) return;
    const uid = auth.currentUser.providerData[0].uid;

    const reference = collection(
      store,
      `users/${uid}/rooms`,
    ) as CollectionReference<Room>;
    const snapshot = await getDocs(reference);

    return snapshot.docs.map((doc) => doc.data());
  }, [auth.currentUser, store]);

  const subscribe = useCallback(
    async (user: User, room: Room): Promise<void> => {
      const batch = writeBatch(store);
      const userDocument = doc(
        store,
        'rooms',
        room.uid,
        'users',
        user.uid,
      ) as DocumentReference<User>;
      const roomDocument = doc(
        store,
        'users',
        user.uid,
        'rooms',
        room.uid,
      ) as DocumentReference<Room>;

      batch.set(userDocument, user);
      batch.set(roomDocument, room);

      await batch.commit();
    },
    [store],
  );

  const createRoom = useCallback(
    async (user: User): Promise<void> => {
      // TODO: implement duplicate room check

      if (!auth.currentUser) return;

      const uid = uuid();
      const roomDocument = doc(store, 'rooms', uid) as DocumentReference<Room>;
      const room = { uid };
      await setDoc(roomDocument, room);

      const from = auth.currentUser.providerData[0];
      const to = user;

      await Promise.all([subscribe(from, room), subscribe(to, room)]);
    },
    [auth.currentUser, store, subscribe],
  );

  return { createRoom, getRoom, getAllRooms };
};
