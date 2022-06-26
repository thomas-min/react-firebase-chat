import { Button, Flex, Input } from '@chakra-ui/react';
import { addDoc, collection, CollectionReference } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { useFireBase } from '~/app/hooks/useFirebase';
import { Message } from '~/types';

export const MessageForm = () => {
  const { auth, store } = useFireBase();
  const messagesCollection = collection(store, 'messages') as CollectionReference<Message>;
  const [formValue, setFormValue] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const { uid, photoURL } = auth.currentUser!;

      await addDoc(messagesCollection, {
        text: formValue,
        uid,
        photoURL,
      });

      setFormValue('');
    },
    [auth.currentUser, formValue, messagesCollection],
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Flex bg='gray.100' py='4' px='2'>
        <Input
          bg='white'
          m='1'
          type='string'
          value={formValue}
          onChange={handleInputChange}
          placeholder='Type your message...'
        />
        <Button m='1' colorScheme='teal' type='submit'>
          send
        </Button>
      </Flex>
    </form>
  );
};
