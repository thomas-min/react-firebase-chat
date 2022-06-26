import { Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useFireBase } from '~/app/hooks/useFirebase';

export const SignInButton: React.FC = () => {
  const { auth } = useFireBase();
  const handleClick = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <Button onClick={handleClick} colorScheme='gray' variant='outline' leftIcon={<FaGoogle />}>
      Continue with google
    </Button>
  );
};
