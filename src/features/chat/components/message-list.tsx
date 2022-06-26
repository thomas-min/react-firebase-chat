import { Box, CloseButton, Flex, Image, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roomState } from '~/app/atoms/room-state';
import { Sticky } from '~/app/components/sticky';
import { ROUTES } from '~/app/configs/app';
import { Message as MessageDto } from '~/app/types';
import { getCurrentUserId } from '~/app/utils/firebase';
import { useMessageData } from '../hooks/useMessageData';
import { getFriend } from '../utils/getFriend';

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
        <Image
          borderRadius='100'
          src={imgSrc}
          alt={imgSrc}
          boxSize='12'
          mx='auto'
          mr='4'
        />
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

const Message: React.FC<MessageProps> = ({ message }) => {
  const { text } = message;
  const isMyMessage = getCurrentUserId() === message.user.uid;

  return (
    <Flex w='full' justify={isMyMessage ? 'end' : 'start'} align={'center'}>
      <Box
        borderRadius={'base'}
        p='2'
        m='1'
        bg={isMyMessage ? 'teal.100' : 'gray.100'}
      >
        {text}
      </Box>
    </Flex>
  );
};

export const MessageList = () => {
  const room = useRecoilValue(roomState);
  const messages = useMessageData(room);
  const friend = getFriend(room);

  if (!friend) return null;

  return (
    <Box px='6' flexGrow='1' overflow='scroll'>
      <Header
        name={friend.displayName!}
        imgSrc={friend.photoURL!}
        email={friend.email!}
      />
      <Box>
        {messages &&
          messages.map((message) => (
            <Message key={message.uid} message={message} />
          ))}
      </Box>
    </Box>
  );
};
