// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [serverDates, setServerDates] = React.useState({
    startDay: new Date(),
    fifthMonth: new Date(),
    sixthMonth: new Date(),
    lastMonth: new Date(),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(User !== null);

  useEffect(() => {
    //setIsAuthenticated(User !== null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        User,
        setUser,
        serverDates,
        setServerDates,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
