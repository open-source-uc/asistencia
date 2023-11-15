import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginUser, logoutUser, registerUser } from '@/api/auth';
import { getMe } from '@/api/users';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (username: string, password:string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      if (response.access_token) {
        await SecureStore.setItemAsync('userToken', response.access_token);
        setIsAuthenticated(true);
        await fetchCurrentUser();
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userDetails) => {
    setIsLoading(true);
    try {
      await registerUser(userDetails);
    } catch (error) {
      console.error("Registration error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      await SecureStore.deleteItemAsync('userToken');
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await getMe();
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user", error);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        if (userToken) {
          setIsAuthenticated(true);
          await fetchCurrentUser();
        }
      } catch (e) {
        console.error('Restoration error', e);
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
    register,
    fetchCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
