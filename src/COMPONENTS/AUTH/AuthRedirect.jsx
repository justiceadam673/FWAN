// src/COMPONENTS/AUTH/AuthRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userData?.role) {
      if (userData.role === "buyer") {
        navigate("/buyersoverview");
      } else if (userData.role === "farmer") {
        navigate("/farmersoverview");
      }
    }
  }, [currentUser, userData, navigate]);

  return !currentUser ? children : null;
};

export default AuthRedirect;
