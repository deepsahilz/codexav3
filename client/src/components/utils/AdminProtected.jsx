import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";

const AdminProtected = ({ children }) => {
  const { user} = useUserContext();

  
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;
