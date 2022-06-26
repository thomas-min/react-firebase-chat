import { doc, DocumentReference, setDoc } from 'firebase/firestore';
import { getFirebase } from '~/app/utils/firebase';
import { User } from '~/app/types';

export const upsertUser = (user: User): void => {
  const { store } = getFirebase();
  const _document = doc(store, 'users', user.uid) as DocumentReference<User>;
  setDoc(_document, user);
};
