import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../../services/api';

/**
 * Hook para gestionar el estado de autenticación y los datos del usuario en toda la aplicación.
 * YA NO contiene la lógica de logout.
 */
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

  // Se ha eliminado la función logout de este hook.
  return { user, isLoggedIn, isLoading };
};
