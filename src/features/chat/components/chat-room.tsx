import { getAuth } from 'firebase/auth';
import {
  limit,
  query,
  collection,
  getFirestore,
  CollectionReference,
  addDoc,
} from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Message } from '~/types';

interface ChatMessageProps {
  message: Message;
  children?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, uid, photoURL } = message;

  return (
    <div>
      <img src={photoURL || ''} alt={uid} />
      <p>{text}</p>
    </div>
  );
};

export const ChatRoom: React.FC = () => {
  const messagesCollection = collection(getFirestore(), 'messages') as CollectionReference<Message>;

  const messagesQuery = query(messagesCollection, limit(25));
  const [messagesSnapshot] = useCollection(messagesQuery);

  const [formValue, setFormValue] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const { uid, photoURL } = getAuth().currentUser!;

      await addDoc(messagesCollection, {
        text: formValue,
        uid,
        photoURL,
      });

      setFormValue('');
    },
    [formValue, messagesCollection],
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  }, []);

  return (
    <>
      <div>
        {messagesSnapshot &&
          messagesSnapshot.docs.map((doc) => <ChatMessage key={doc.id} message={doc.data()} />)}
      </div>
      <form onSubmit={handleSubmit}>
        <input type='string' value={formValue} onChange={handleInputChange} />
        <button type='submit'>submit</button>
      </form>
    </>
  );
};
