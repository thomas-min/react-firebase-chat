import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useFireBase } from '~/app/hooks/useFirebase';

export const SignOutButton: React.FC = () => {
  const { auth } = useFireBase();
  const handleClick = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return (
    <Button colorScheme='gray' variant='solid' onClick={handleClick}>
      Sign Out
    </Button>
  );
};
