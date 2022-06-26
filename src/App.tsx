import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageContainer } from './app/components/page-container';
import RequireAuth from './features/auth/components/require-auth';
import { ROUTES } from './app/configs/app';
import { ChatPage } from './routes/chat';
import { HomePage } from './routes/home';
import { LoginPage } from './routes/login';
import { useEffect } from 'react';
import { setScreenSize } from './app/utils/screenSize';

const App = () => {
  useEffect(() => {
    window.addEventListener('resize', setScreenSize);
    setScreenSize();
  }, []);

  return (
    <PageContainer>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.HOME}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path={ROUTES.CHAT}
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </PageContainer>
  );
};

export default App;
