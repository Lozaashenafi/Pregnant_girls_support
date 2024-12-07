import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../utils/authHeader"; // Function to get user authentication details

// Create AuthContext
const AuthContext = createContext();

// Prepare AuthProvider
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch user authentication data
  const fetchData = async () => {
    try {
      const loggedInUser = await getAuth(); // Get the user data (including token and role)
      if (loggedInUser.token) {
        setIsLoggedIn(true); // Set the user as logged in if there's a valid token
        const { id, firstName, role, token } = loggedInUser;
        setUserData({
          id,
          firstName,
          role,
          token,
        });
      }
    } catch (error) {
      console.log(error); // Handle error if fetching user data fails
    }
  };

  const values = {
    isLoggedIn, // Whether the user is logged in
    setIsLoggedIn, // Function to set the login state
    userData, // User data (id, first name, role, token)
    setUserData, // Function to set user data
    fetchData, // Function to refetch user data
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// Custom hook to access auth context values
export const useAuth = () => {
  return useContext(AuthContext);
};
