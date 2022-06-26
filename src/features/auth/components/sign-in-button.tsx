import { Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { getFirebase } from '~/app/utils/firebase';
import { upsertUser } from '../services/user';

export const SignInButton: React.FC = () => {
  const { auth } = getFirebase();

  const handleClick = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(auth, provider);

    const user = signInResult.user.providerData[0];

    upsertUser(user);
  }, [auth]);

  return (
    <Button
      onClick={handleClick}
      colorScheme='gray'
      variant='outline'
      leftIcon={<FaGoogle />}
    >
      Continue with google
    </Button>
  );
};
