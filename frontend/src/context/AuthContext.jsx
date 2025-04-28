import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api"; // your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // (optional) loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
      setLoading(false); // Finished fetching
    };

    fetchUser();
  }, []);

  // ⭐ Logout function
  const logout = async () => {
    try {
      await api.post("/users/logout"); // You should have an endpoint that clears cookie
      setUser(null); // Remove user from context
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
