import { useState, useEffect, useCallback, useMemo } from 'react';
import AuthContext from './AuthContext';
import { getCurrentUser } from '../../services/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para verificar el estado de autenticación
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDetails = localStorage.getItem('usuario');
      if (userDetails) {
        // Si hay datos en localStorage, intentamos recuperarlos
        const userData = JSON.parse(userDetails);
        
        // Establecer los datos del localStorage primero
        setUser(userData);
        setIsLoggedIn(true);
        
        // También verificamos con el servidor si la sesión sigue siendo válida
        try {
          const response = await getCurrentUser();
          
          if (response.data.success) {
            // Mantener el token que ya teníamos
            const updatedUserData = {
              ...response.data.user,
              token: userData.token
            };
            
            // Actualizar localStorage y estado con datos frescos del servidor
            localStorage.setItem('usuario', JSON.stringify(updatedUserData));
            setUser(updatedUserData);
          } else {
            // Si el servidor dice que no es válido, limpiamos
            localStorage.removeItem('usuario');
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (serverError) {
          // Si hay problemas de red, mantenemos la sesión local
          console.log("No se pudo verificar la sesión con el servidor:", serverError);
        }
      } else {
        // Si no hay datos en localStorage, no hay sesión
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al procesar los datos de autenticación:", error);
      localStorage.removeItem('usuario');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para actualizar el estado cuando el usuario inicia sesión
  const updateAuthState = useCallback((userData = null) => {
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      checkAuthStatus();
    }
  }, [checkAuthStatus]);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
    
    // Escuchar los eventos de storage para sincronizar el estado entre pestañas
    const handleStorageChange = (event) => {
      if (event.key === 'usuario') {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuthStatus]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    isLoggedIn,
    isLoading,
    updateAuthState,
    checkAuthStatus
  }), [user, isLoggedIn, isLoading, updateAuthState, checkAuthStatus]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
