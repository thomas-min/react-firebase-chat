import { getAuth } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../configs/app';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const auth = getAuth();
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
