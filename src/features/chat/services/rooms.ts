import { doc, DocumentReference, setDoc, writeBatch } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getFirebase } from '~/app/utils/firebase';
import { Room, User } from '~/types';

const subscribe = async (user: User, room: Room): Promise<void> => {
  const { store } = getFirebase();

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
};

export const createRoom = async (from: User, to: User): Promise<Room> => {
  // TODO: implement duplicate room check
  const { store } = getFirebase();

  const uid = uuid();
  const roomDocument = doc(store, 'rooms', uid) as DocumentReference<Room>;
  const room = { uid };
  await setDoc(roomDocument, room);

  await Promise.all([subscribe(from, room), subscribe(to, room)]);

  return room;
};
