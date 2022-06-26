import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { RESOURCES } from '~/app/configs/resources';
import { getFirebase } from '~/app/utils/firebase';
import { Room, User } from '~/types';

const subscribe = async (user: User, room: Room): Promise<void> => {
  const { store } = getFirebase();

  const batch = writeBatch(store);
  const userDocument = doc(
    store,
    RESOURCES.ROOMS,
    room.uid,
    RESOURCES.USERS,
    user.uid,
  ) as DocumentReference<User>;
  const roomDocument = doc(
    store,
    RESOURCES.USERS,
    user.uid,
    RESOURCES.ROOMS,
    room.uid,
  ) as DocumentReference<Room>;

  batch.set(userDocument, user);
  batch.set(roomDocument, room);

  await batch.commit();
};

const checkExisting = async (
  from: User,
  to: User,
): Promise<Room | undefined> => {
  const { store } = getFirebase();
  const _collection = collection(store, 'rooms') as CollectionReference<Room>;

  const _query = query(
    _collection,
    where(`${RESOURCES.USERS}.${from.uid}`, '==', true),
    where(`${RESOURCES.USERS}.${to.uid}`, `==`, true),
  );

  const _snapshot = await getDocs(_query);

  if (_snapshot.empty) return;
  return _snapshot.docs[0].data();
};

export const createRoom = async (from: User, to: User): Promise<Room> => {
  const { store } = getFirebase();

  const existingRoom = await checkExisting(from, to);
  if (existingRoom) return existingRoom;

  const uid = uuid();
  const _document = doc(store, 'rooms', uid) as DocumentReference<Room>;
  const room = { uid, users: { [from.uid]: true, [to.uid]: true } };
  await setDoc(_document, room);

  await Promise.all([subscribe(from, room), subscribe(to, room)]);

  return room;
};
