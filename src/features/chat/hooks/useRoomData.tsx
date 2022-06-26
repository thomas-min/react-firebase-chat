import { collection, CollectionReference } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getCurrentUserId, getFirebase } from '~/app/utils/firebase';
import { Room } from '~/app/types';

export const useRoomData = () => {
  const { store } = getFirebase();
  const uid = getCurrentUserId();

  const _collection = collection(
    store,
    `users/${uid}/rooms`,
  ) as CollectionReference<Room>;

  const [rooms] = useCollectionData(_collection);
  return rooms;
};
