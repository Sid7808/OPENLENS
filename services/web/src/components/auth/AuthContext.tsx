import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_CORE_API_URL || "http://localhost:8080";

  useEffect(() => {
    let isMounted = true;

    const validateToken = async () => {
      const savedToken = localStorage.getItem("openlens_token");

      if (!savedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (response.ok) {
          const userData: User = await response.json();
          if (isMounted) {
            setToken(savedToken);
            setUser(userData);
            localStorage.setItem("openlens_user", JSON.stringify(userData));
          }
        } else {
          // Token is invalid or expired (e.g., 401)
          localStorage.removeItem("openlens_token");
          localStorage.removeItem("openlens_user");
          if (isMounted) {
            setToken(null);
            setUser(null);
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("openlens_token");
        localStorage.removeItem("openlens_user");
        if (isMounted) {
          setToken(null);
          setUser(null);
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    validateToken();

    return () => {
      isMounted = false;
    };
  }, [API_URL, navigate]);
  

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Authentication failed. Please check your credentials.");
      }

      const data = await response.json();
      const { access_token, user: authenticatedUser } = data;

      localStorage.setItem("openlens_token", access_token);
      localStorage.setItem("openlens_user", JSON.stringify(authenticatedUser));

      setToken(access_token);
      setUser(authenticatedUser);
    } catch (error) {
      localStorage.removeItem("openlens_token");
      localStorage.removeItem("openlens_user");
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("openlens_token");
    localStorage.removeItem("openlens_user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
