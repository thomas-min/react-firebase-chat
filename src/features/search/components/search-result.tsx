import { Box, Center, HStack, Text, Image } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { roomState } from '~/app/atoms/room-state';
import { ROUTES } from '~/app/configs/app';
import { getFirebase } from '~/app/utils/firebase';
import { createRoom } from '~/features/chat/services/rooms';
import { User } from '~/app/types';
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
  const navigate = useNavigate();
  const setRoom = useSetRecoilState(roomState);

  const handleClick = useCallback(async () => {
    const { auth } = getFirebase();

    const from = auth.currentUser?.providerData[0];
    const to = user;

    if (!from) return;

    const room = await createRoom(from, to);

    setRoom(room);
    navigate(ROUTES.CHAT);
  }, [navigate, setRoom, user]);

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
