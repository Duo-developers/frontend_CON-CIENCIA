import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { updateAuthState } = useAuth();

  const logout = useCallback(() => {
    localStorage.removeItem('usuario');
    
    updateAuthState(null);
    
    navigate('/login', { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }, [navigate, updateAuthState]);

  return { logout };
};
