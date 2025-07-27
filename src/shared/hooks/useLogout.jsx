import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { updateAuthState } = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem('usuario');
    
    // Actualizamos el estado de autenticación en toda la aplicación
    updateAuthState(null);
    
    // Redirigir al login y recargar la página
    navigate('/login', { replace: true });
    // Esperar un momento para asegurar que la navegación se complete antes de recargar
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }, [navigate, updateAuthState]);

  return { logout };
};
