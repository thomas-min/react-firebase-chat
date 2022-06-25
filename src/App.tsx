import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import * as FIREBASE from './configs/firebase';
import { SignInButton } from './features/auth/components/sign-in-button';
import { ChatRoom } from './features/chat/components/chat-room';

initializeApp(FIREBASE.CONFIG);

const App: React.FC = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <header></header>
      <section>{user ? <ChatRoom /> : <SignInButton />}</section>
    </div>
  );
};

export default App;
