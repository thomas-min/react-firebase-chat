import { Box, CloseButton, Flex, Image, Text } from '@chakra-ui/react';
import { collection, CollectionReference, limit, query } from 'firebase/firestore';
import { useCallback } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { Sticky } from '~/app/components/sticky';
import { ROUTES } from '~/app/configs/app';
import { useFireBase } from '~/app/hooks/useFirebase';
import { Message as MessageDto } from '~/types';

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

interface MessageProps {
  message: MessageDto;
  children?: React.ReactNode;
}

// TODO: 보낸 메시지와 받은 메시지 구분
const Message: React.FC<MessageProps> = ({ message }) => {
  const { text } = message;

  return (
    <Flex w='full' justify={'start'} align={'center'}>
      <Box borderRadius={'base'} bg='gray.100' p='2' m='1'>
        {text}
      </Box>
    </Flex>
  );
};

export const MessageList = () => {
  const { store } = useFireBase();
  const messagesCollection = collection(store, 'messages') as CollectionReference<MessageDto>;

  const messagesQuery = query(messagesCollection, limit(25));
  const [messagesSnapshot] = useCollection(messagesQuery);

  return (
    <Box px='6' flexGrow='1' overflow='scroll'>
      <Header name='Dan Abramov' imgSrc='https://bit.ly/dan-abramov' email={'dan@gmail.com'} />
      <Box>
        {messagesSnapshot?.docs.map((doc) => (
          <Message key={doc.id} message={doc.data()} />
        ))}
      </Box>
    </Box>
  );
};
