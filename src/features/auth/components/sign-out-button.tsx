import { Button } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useCallback } from 'react';

export const SignOutButton: React.FC = () => {
  const handleClick = useCallback(() => {
    getAuth().signOut();
  }, []);

  return (
    <Button colorScheme='gray' variant='solid' onClick={handleClick}>
      Sign Out
    </Button>
  );
};
