import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState, useEffect } from "react";

import { loginUser, logoutUser } from "@/api/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      if (response.authentication_token) {
        await SecureStore.setItemAsync(
          "userToken",
          response.authentication_token,
        );
        await SecureStore.setItemAsync("email", response.email);
        setIsAuthenticated(true);
        setCurrentUser({ email: response.email });
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      await SecureStore.deleteItemAsync("userToken");
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
        if (userToken) {
          const email = await SecureStore.getItemAsync("email");
          setIsAuthenticated(true);
          setCurrentUser({ email });
        }
      } catch (e) {
        console.error("Restoration error", e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
