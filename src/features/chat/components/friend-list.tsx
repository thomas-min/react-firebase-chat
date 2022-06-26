import { useCallback } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/app/configs/app';
import { SubTitle } from '~/app/components/sub-title';
import { useRoomData } from '../hooks/useRoomData';
import { Room } from '~/app/types';
import { getFriend } from '../utils/getFriend';
import { useSetRecoilState } from 'recoil';
import { roomState } from '~/app/atoms/room-state';

interface RecentRoomProps {
  room: Room;
}

const FriendItem: React.FC<RecentRoomProps> = ({ room }) => {
  const friend = getFriend(room);
  const navigate = useNavigate();
  const setRoom = useSetRecoilState(roomState);
  const handleClick = useCallback(() => {
    setRoom(room);
    navigate(ROUTES.CHAT);
  }, [navigate, room, setRoom]);

  if (!friend) return null;

  return (
    <Flex w='full' my='6' cursor='pointer' onClick={handleClick}>
      <Image
        borderRadius='100'
        src={friend.photoURL!}
        alt={friend.photoURL!}
        boxSize='12'
        mx='auto'
        mr='4'
      />
      <Box flexGrow='1'>
        <Flex>
          <Text flexGrow='1' color='teal' fontWeight='600'>
            {friend.displayName}
          </Text>
          {/* <Text>{date.getHours() + ':' + date.getMinutes()}</Text> */}
        </Flex>
        {/* <Text>{message}</Text> */}
      </Box>
    </Flex>
  );
};

export const FriendList = () => {
  const rooms = useRoomData();

  return (
    <Box w='full'>
      <SubTitle value='Friends' />
      {rooms && rooms.map((room) => <FriendItem key={room.uid} room={room} />)}
    </Box>
  );
};
