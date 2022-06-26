import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roomState } from '~/app/atoms/room-state';
import { ROUTES } from '~/app/configs/app';
import { MessageForm } from '~/features/chat/components/message-form';
import { MessageList } from '~/features/chat/components/message-list';

export const ChatPage = () => {
  const navigate = useNavigate();
  const room = useRecoilValue(roomState);

  useEffect(() => {
    if (!room) navigate(ROUTES.HOME, { replace: true });
  }, [navigate, room]);

  return (
    <Flex flexDir='column' h='full'>
      <MessageList />
      <MessageForm />
    </Flex>
  );
};
