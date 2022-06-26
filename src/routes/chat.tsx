import { Flex } from '@chakra-ui/react';
import { MessageForm } from '~/features/chat/components/message-form';
import { MessageList } from '~/features/chat/components/message-list';

export const ChatPage = () => {
  return (
    <Flex flexDir='column' h='full'>
      <MessageList />
      <MessageForm />
    </Flex>
  );
};
