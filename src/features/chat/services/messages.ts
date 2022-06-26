import { getFirebase } from '~/app/utils/firebase';
import { Message, Room } from '~/app/types';
import { v4 as uuid } from 'uuid';
import { RESOURCES } from '~/app/configs/resources';
import {
  doc,
  DocumentReference,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

export const sendMessage = async (text: string, room: Room) => {
  const { store, auth } = getFirebase();
  const user = auth.currentUser?.providerData[0];

  if (!user) return;

  const uid = uuid();
  const _document = doc(
    store,
    RESOURCES.ROOMS,
    room.uid,
    RESOURCES.MESSAGES,
    uid,
  ) as DocumentReference<Message>;
  const message: Message = {
    uid,
    text,
    user,
    createdAt: serverTimestamp() as Timestamp,
  };

  await setDoc(_document, message);

  return message;
};
