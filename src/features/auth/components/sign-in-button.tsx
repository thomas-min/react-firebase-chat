import { Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useFireBase } from '~/app/hooks/useFirebase';
import { useUser } from '~/features/user/hooks/useUser';

export const SignInButton: React.FC = () => {
  const { auth } = useFireBase();
  const { upsertUser } = useUser();

  const handleClick = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(auth, provider);

    const userInfo = signInResult.user.providerData[0];

    upsertUser(userInfo);
  }, [auth, upsertUser]);

  return (
    <Button onClick={handleClick} colorScheme='gray' variant='outline' leftIcon={<FaGoogle />}>
      Continue with google
    </Button>
  );
};
