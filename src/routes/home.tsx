import { Box } from '@chakra-ui/react';
import { RecentList } from '~/features/chat/components/recent-list';
import { UserSearchSection } from '~/features/search/components/search-section';

export const HomePage = () => {
  return (
    <Box px='6' bg='white'>
      <UserSearchSection />
      <RecentList />
    </Box>
  );
};
