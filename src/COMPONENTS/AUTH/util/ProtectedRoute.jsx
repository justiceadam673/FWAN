import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // adjust path as needed

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to='/role' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
