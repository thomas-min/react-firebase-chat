import { collection, CollectionReference } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebase } from '~/app/utils/firebase';
import { Room } from '~/types';

export const useRoomsData = () => {
  const { store, auth } = getFirebase();
  const uid = auth.currentUser?.providerData[0].uid;

  const _collection = collection(
    store,
    `users/${uid}/rooms`,
  ) as CollectionReference<Room>;

  const [rooms] = useCollectionData(_collection);
  return rooms;
};
