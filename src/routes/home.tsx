import { Box, Divider, Flex } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { SubTitle } from '~/app/components/sub-title';
import { Title } from '~/app/components/title';
import { SignOutButton } from '~/features/auth/components/sign-out-button';
import { RecentList } from '~/features/chat/components/recent-list';
import { UserSearchForm } from '~/features/user/components/search-form';
import { UserSearchResult } from '~/features/user/components/search-result';

const STICKY_SX: CSSProperties = {
  background: 'white',
  position: 'sticky',
  top: 0,
};

export const HomePage = () => {
  return (
    <Box px={6} bg='white'>
      <Box sx={STICKY_SX}>
        <Flex justify={'space-between'} alignItems={'center'}>
          <Title value='Chat' />
          <SignOutButton />
        </Flex>
        <UserSearchForm />
        <UserSearchResult />
        <Divider mb={4} />
      </Box>
      <main>
        <SubTitle value='Recent' />
        <RecentList />
      </main>
    </Box>
  );
};
