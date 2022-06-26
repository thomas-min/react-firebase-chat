import { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/app/configs/app';
import { SubTitle } from '~/app/components/sub-title';
import { useRoomData } from '../hooks/useRoomData';
import { Room, User } from '~/app/types';
import { useUserQuery } from '~/app/hooks/useUserQuery';
import { getFirebase } from '~/app/utils/firebase';

interface RecentRoomProps {
  room: Room;
}

const RecentRoom: React.FC<RecentRoomProps> = ({ room }) => {
  const { auth } = getFirebase();
  const { getUser } = useUserQuery();

  const { users: userIdMap } = room;
  const userIds = Object.keys(userIdMap);

  const currentUserId = auth.currentUser?.providerData[0].uid;
  const partnerId = userIds.find((id) => id !== currentUserId);

  const [partner, setPartner] = useState<User>();
  useEffect(() => {
    const getPartner = async () => {
      if (partnerId) {
        const partner = await getUser(partnerId);
        setPartner(partner);
      }
    };
    getPartner();
  }, [getUser, partnerId]);

  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(ROUTES.CHAT);
  }, [navigate]);

  if (!partner) return null;

  return (
    <Flex w='full' my='6' cursor='pointer' onClick={handleClick}>
      <Image
        borderRadius='100'
        src={partner.photoURL!}
        alt={partner.photoURL!}
        boxSize='12'
        mx='auto'
        mr='4'
      />
      <Box flexGrow='1'>
        <Flex>
          <Text flexGrow='1' color='teal' fontWeight='600'>
            {partner.displayName}
          </Text>
          {/* <Text>{date.getHours() + ':' + date.getMinutes()}</Text> */}
        </Flex>
        {/* <Text>{message}</Text> */}
      </Box>
    </Flex>
  );
};

export const RecentList = () => {
  const rooms = useRoomData();

  return (
    <Box w='full'>
      <SubTitle value='Recent' />
      {rooms && rooms.map((room) => <RecentRoom key={room.uid} room={room} />)}
    </Box>
  );
};
