import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../../services/api';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDetails = localStorage.getItem('usuario');
      if (userDetails) {
        const response = await getCurrentUser();
        if (response.data.success) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('usuario');
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      localStorage.removeItem('usuario');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { user, isLoggedIn, isLoading };
};
