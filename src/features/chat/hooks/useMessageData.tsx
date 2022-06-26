import {
  collection,
  CollectionReference,
  orderBy,
  query,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RESOURCES } from '~/app/configs/resources';
import { getFirebase } from '~/app/utils/firebase';
import { Message, Room } from '~/app/types';

export const useMessageData = (room: Room | null) => {
  const { store } = getFirebase();

  const _collection = collection(
    store,
    `${RESOURCES.ROOMS}/${room?.uid}/${RESOURCES.MESSAGES}`,
  ) as CollectionReference<Message>;

  const _query = query(_collection, orderBy('createdAt'));

  const [messages] = useCollectionData(_query);

  if (!room) return [];
  return messages;
};
