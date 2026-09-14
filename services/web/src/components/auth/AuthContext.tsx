import React, { createContext, useContext } from "react";

// AuthContext placeholder for future authentication implementation
interface AuthContextType {}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
