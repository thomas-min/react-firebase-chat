import { Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { getFirebase } from '~/app/utils/firebase';
import { useUserQuery } from '~/features/user/hooks/useUserQuery';

export const SignInButton: React.FC = () => {
  const { auth } = getFirebase();
  const { upsertUser } = useUserQuery();

  const handleClick = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(auth, provider);

    const user = signInResult.user.providerData[0];

    upsertUser(user);
  }, [auth, upsertUser]);

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
