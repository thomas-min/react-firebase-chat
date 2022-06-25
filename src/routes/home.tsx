import { Box, Divider, Flex } from '@chakra-ui/react';
import { Sticky } from '~/app/components/sticky';
import { SubTitle } from '~/app/components/sub-title';
import { Title } from '~/app/components/title';
import { SignOutButton } from '~/features/auth/components/sign-out-button';
import { RecentList } from '~/features/chat/components/recent-list';
import { UserSearchForm } from '~/features/user/components/search-form';
import { UserSearchResult } from '~/features/user/components/search-result';

export const HomePage = () => {
  return (
    <Box px='6' bg='white'>
      <Sticky>
        <Flex justify={'space-between'} align={'center'}>
          <Title value='Chat' />
          <SignOutButton />
        </Flex>
        <UserSearchForm />
        <UserSearchResult />
        <Divider mb='4' />
      </Sticky>
      <main>
        <SubTitle value='Recent' />
        <RecentList />
      </main>
    </Box>
  );
};
