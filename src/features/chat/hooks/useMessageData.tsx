import { collection, CollectionReference } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RESOURCES } from '~/app/configs/resources';
import { getFirebase } from '~/app/utils/firebase';
import { Message, Room } from '~/types';

export const useMessagesData = (room: Room | null) => {
  const { store } = getFirebase();

  const _collection = collection(
    store,
    `${RESOURCES.ROOMS}/${room?.uid}/${RESOURCES.MESSAGES}`,
  ) as CollectionReference<Message>;

  const [messages] = useCollectionData(_collection);

  if (!room) return [];
  return messages;
};
