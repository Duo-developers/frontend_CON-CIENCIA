import { useState } from "react";
import { login, getCurrentUser } from "../../services/api"; // Importamos ambas funciones
import { useAuth } from "../context/useAuth";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateAuthState } = useAuth();

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    
    const { identifier, password } = credentials;

    const isEmail = identifier.includes('@');
    const loginData = {
      password,
      [isEmail ? 'email' : 'username']: identifier
    };

    try {
      const response = await login(loginData);
      
      console.log("Respuesta del login:", response.data);
      
      const userData = {
        ...response.data.user,
        token: response.data.user.token
      };
      
      localStorage.setItem('usuario', JSON.stringify(userData));
      
      try {
        const userDetails = await getCurrentUser();
        if (userDetails.data && userDetails.data.success) {
          const fullUserData = {
            ...userDetails.data.user,
            token: response.data.user.token
          };
          localStorage.setItem('usuario', JSON.stringify(fullUserData));
          updateAuthState(fullUserData);
        } else {
          updateAuthState(userData);
        }
      } catch (error) {
        console.log("Error al obtener datos completos:", error);
        updateAuthState(userData);
      }
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login: loginUser, loading, error, setError };
};
