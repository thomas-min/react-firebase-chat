import { Box, Center, Divider, Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignInButton } from '~/features/auth/components/sign-in-button';
import { getFirebase } from '~/app/utils/firebase';

export const LoginPage: React.FC = () => {
  const { auth } = getFirebase();
  const location = useLocation();
  const navigate = useNavigate();
  // type assert as any due to react router type error
  const state = location.state as any;
  const from = state?.from.pathname || '/';

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  return (
    <Center w='full' h='full'>
      <Box textAlign='center'>
        <Text fontSize='4xl'>Login</Text>
        <Divider my={6} />
        <SignInButton />
      </Box>
    </Center>
  );
};
