import { Box, Button, Flex, Input, Text, Image, CloseButton } from '@chakra-ui/react';
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
import { useNavigate } from 'react-router-dom';
import { Sticky } from '~/app/components/sticky';
import { ROUTES } from '~/app/configs/app';
import { useFireBase } from '~/app/hooks/useFirebase';
import { Message } from '~/types';

interface HeaderProps {
  imgSrc: string;
  name: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ imgSrc, name, email }) => {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  return (
    <Sticky>
      <Flex w='full' py='4' bg='white'>
        <Image borderRadius='100' src={imgSrc} alt={imgSrc} boxSize='12' mx='auto' mr='4' />
        <Box flexGrow='1'>
          <Text flexGrow='1' color='teal' fontWeight='600'>
            {name}
          </Text>
          <Text>{email}</Text>
        </Box>
        <CloseButton onClick={handleClose} />
      </Flex>
    </Sticky>
  );
};

interface ChatMessageProps {
  message: Message;
  children?: React.ReactNode;
}

// TODO: 보낸 메시지와 받은 메시지 구분
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text } = message;

  return (
    <Flex w='full' justify={'start'} align={'center'}>
      <Box borderRadius={'base'} bg='gray.100' p='2' m='1'>
        {text}
      </Box>
    </Flex>
  );
};

const ChatMessageList = () => {
  const { store } = useFireBase();
  const messagesCollection = collection(store, 'messages') as CollectionReference<Message>;

  const messagesQuery = query(messagesCollection, limit(25));
  const [messagesSnapshot] = useCollection(messagesQuery);

  return (
    <Box>
      {messagesSnapshot &&
        messagesSnapshot.docs.map((doc) => <ChatMessage key={doc.id} message={doc.data()} />)}
    </Box>
  );
};

export const ChatRoom = () => {
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
    <Flex flexDir='column' h='full'>
      <Box px='6' flexGrow='1' overflow='scroll'>
        <Header name='Dan Abramov' imgSrc='https://bit.ly/dan-abramov' email={'dan@gmail.com'} />
        <ChatMessageList />
      </Box>
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
    </Flex>
  );
};
