import { collection, CollectionReference } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebase } from '~/app/utils/firebase';
import { Room } from '~/types';

export const useRoomsData = () => {
  const { store, auth } = getFirebase();
  const uid = auth.currentUser?.providerData[0].uid;

  const reference = collection(
    store,
    `users/${uid}/rooms`,
  ) as CollectionReference<Room>;

  const [rooms] = useCollectionData(reference);
  return rooms;
};
