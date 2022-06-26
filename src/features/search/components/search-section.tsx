import { Divider, Flex } from '@chakra-ui/react';
import { Sticky } from '~/app/components/sticky';
import { Title } from '~/app/components/title';
import { SignOutButton } from '~/features/auth/components/sign-out-button';
import { UserSearchForm } from './search-form';
import { UserSearchResult } from './search-result';

const Header = () => {
  return (
    <Flex justify={'space-between'} align={'center'}>
      <Title value='Chat' />
      <SignOutButton />
    </Flex>
  );
};

export const UserSearchSection = () => {
  return (
    <Sticky>
      <Header />
      <UserSearchForm />
      <UserSearchResult />
      <Divider mb='4' />
    </Sticky>
  );
};
