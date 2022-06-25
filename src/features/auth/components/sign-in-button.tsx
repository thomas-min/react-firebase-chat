import { Button } from '@chakra-ui/react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';

export const SignInButton: React.FC = () => {
  const handleClick = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider);
  }, []);

  return (
    <Button onClick={handleClick} colorScheme='gray' variant='outline' leftIcon={<FaGoogle />}>
      Continue with google
    </Button>
  );
};
