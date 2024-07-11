import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken)
    setIsAuth(true)
  };
  const clearTokens = () => {
    localStorage.clear("refreshtoken","token")
    setIsAuth(false);
    console.log("logged out");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, storeTokenInLS, clearTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provide");
  }
  return authContextValue;
};

