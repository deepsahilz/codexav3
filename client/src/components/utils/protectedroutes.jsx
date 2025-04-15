import { Outlet, Navigate } from 'react-router-dom'; 
import { useUserContext } from '../../context/UserContextProvider';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useUserContext();

  if (isLoggedIn === undefined || isLoggedIn === null) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
