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
import { Room, User } from '~/app/types';

const link = async (user: User, room: Room): Promise<void> => {
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

const checkExisting = async (me: User, friend: User): Promise<Room | null> => {
  const { store } = getFirebase();
  const _collection = collection(store, 'rooms') as CollectionReference<Room>;

  const _query = query(
    _collection,
    where(`${RESOURCES.USERS}.${me.uid}`, '==', me),
    where(`${RESOURCES.USERS}.${friend.uid}`, `==`, friend),
  );

  const _snapshot = await getDocs(_query);

  if (_snapshot.empty) return null;
  return _snapshot.docs[0].data();
};

export const createRoom = async (me: User, friend: User): Promise<Room> => {
  const { store } = getFirebase();

  const existingRoom = await checkExisting(me, friend);
  if (existingRoom) return existingRoom;

  const uid = uuid();
  const _document = doc(store, RESOURCES.ROOMS, uid) as DocumentReference<Room>;
  const room: Room = { uid, users: { [me.uid]: me, [friend.uid]: friend } };
  await setDoc(_document, room);

  await Promise.all([link(me, room), link(friend, room)]);

  return room;
};
