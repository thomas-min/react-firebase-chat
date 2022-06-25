import { getAuth } from 'firebase/auth';
import { useCallback } from 'react';

export const SignOut: React.FC = () => {
  const handleClick = useCallback(() => {
    getAuth().signOut();
  }, []);

  return <button onClick={handleClick}>Sign Out</button>;
};
