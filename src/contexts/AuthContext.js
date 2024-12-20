import React, { useState, createContext } from "react";

// Create the context
export const AuthContext = createContext();

// Provide context to children components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log(userData);
    setUser(userData);
    console.log(userData, "USER");
    localStorage.setItem("authToken", userData.token); // Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
