import { Outlet, Navigate } from 'react-router-dom'; 
import { useUserContext } from '../context/UserContextProvider';

const ProtectedRoutes = () => {

    const {loading,isLoggedIn} = useUserContext();
    if (loading) return null; 
    
    return isLoggedIn? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
