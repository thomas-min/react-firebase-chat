import { Box, Center, HStack, Text, Image } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRoomQuery } from '~/features/chat/hooks/useRoomQuery';
import { User } from '~/types';
import { searchResultState } from '../atoms/search-result-state';

const GuideIcon = () => {
  return (
    <Box textAlign='center'>
      <Center
        border='gray'
        borderWidth={1}
        borderRadius={100}
        boxSize={12}
        mx='auto'
      >
        +
      </Center>
      <Text color='gray.900' fontSize='xx-small' mt={1}>
        Add new
      </Text>
    </Box>
  );
};

interface UserIconProps {
  user: User;
}

const UserIcon: React.FC<UserIconProps> = ({ user }) => {
  const { createRoom } = useRoomQuery();

  const handleClick = useCallback(() => {
    createRoom(user);
  }, [createRoom, user]);

  return (
    <Box textAlign='center' cursor='pointer' onClick={handleClick}>
      <Image
        borderRadius={100}
        src={user.photoURL!}
        alt={user.photoURL!}
        maxW={12}
        boxSize={12}
        mx='auto'
      />
      <Text color='gray.900' fontSize='xx-small' mt={1}>
        {user.displayName}
      </Text>
    </Box>
  );
};

export const UserSearchResult = () => {
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);

  useEffect(() => {
    setSearchResult([]);
  }, [setSearchResult]);

  return (
    <HStack my={6} overflow={'scroll'}>
      <GuideIcon />
      {searchResult.map((user) => (
        <UserIcon key={user.uid} user={user} />
      ))}
    </HStack>
  );
};
