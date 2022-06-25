import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';

export const SignInButton: React.FC = () => {
  const handleClick = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider);
  }, []);

  return <button onClick={handleClick}>Sign in with Google</button>;
};
