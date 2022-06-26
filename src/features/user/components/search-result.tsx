import { Box, Center, HStack, Text, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
  imgSrc: string;
  name: string;
}

const UserIcon: React.FC<UserIconProps> = ({ imgSrc, name }) => {
  return (
    <Box textAlign='center' cursor='pointer'>
      <Image
        borderRadius={100}
        src={imgSrc}
        alt={imgSrc}
        maxW={12}
        boxSize={12}
        mx='auto'
      />
      <Text color='gray.900' fontSize='xx-small' mt={1}>
        {name}
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
      {searchResult.map((el) => (
        <UserIcon key={el.uid} imgSrc={el.photoURL!} name={el.displayName!} />
      ))}
    </HStack>
  );
};
