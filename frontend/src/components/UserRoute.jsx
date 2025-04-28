// components/UserRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow both "user" and "admin" roles to access
  if (user.role !== "user" && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
