import { Box } from '@chakra-ui/react';
import { FriendList } from '~/features/chat/components/friend-list';
import { UserSearchSection } from '~/features/search/components/search-section';

export const HomePage = () => {
  return (
    <Box px='6' bg='white'>
      <UserSearchSection />
      <FriendList />
    </Box>
  );
};
