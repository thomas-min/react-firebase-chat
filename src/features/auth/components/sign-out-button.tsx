import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { getFirebase } from '~/app/utils/firebase';

export const SignOutButton: React.FC = () => {
  const { auth } = getFirebase();
  const handleClick = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <Button colorScheme='gray' variant='solid' onClick={handleClick}>
      Sign Out
    </Button>
  );
};
