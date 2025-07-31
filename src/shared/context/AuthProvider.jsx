import { useState, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import { getCurrentUser } from '../../services/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDetails = localStorage.getItem('usuario');
      if (userDetails) {
        const userData = JSON.parse(userDetails);
        
        setUser(userData);
        setIsLoggedIn(true);
        
        console.log("Datos del usuario en localStorage:", userData); 
        
        try {
          const response = await getCurrentUser();
          console.log("Respuesta de getCurrentUser:", response.data);
          if (response.data.success) {
            const updatedUserData = {
              ...response.data.user,
              token: userData.token
            };
            
            console.log("Datos actualizados del usuario:", updatedUserData); 
            
            localStorage.setItem('usuario', JSON.stringify(updatedUserData));
            setUser(updatedUserData);
          } else {
            localStorage.removeItem('usuario');
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (serverError) {
          console.log("No se pudo verificar la sesión con el servidor:", serverError);
        }
      } else {
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

  const updateAuthState = useCallback((userData = null) => {
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      checkAuthStatus();
    }
  }, [checkAuthStatus]);

  const updateUser = useCallback((updatedUserData) => {
    if (updatedUserData) {
      const currentToken = user?.token;
      const newUserData = {
        ...updatedUserData,
        token: currentToken
      };
      
      localStorage.setItem('usuario', JSON.stringify(newUserData));
      
      setUser(newUserData);
    }
  }, [user]);

  useEffect(() => {
    checkAuthStatus();
    
    const handleStorageChange = (event) => {
      if (event.key === 'usuario') {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuthStatus]);

  const contextValue = {
    user,
    isLoggedIn,
    isLoading,
    updateAuthState,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
