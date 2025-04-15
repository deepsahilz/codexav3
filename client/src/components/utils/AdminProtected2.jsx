import { Outlet, Navigate } from 'react-router-dom'; 
import { useUserContext } from "../../context/UserContextProvider";

const AdminProtected = () => {
  const { user} = useUserContext();
    console.log("redndering admin protected")
  
    
    if (!user) return null;

    return user.role=="admin" ? <Outlet /> : <Navigate to="/" replace />;
  
};

export default AdminProtected;
