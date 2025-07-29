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
    
    // Extraemos el identificador y la contraseña
    const { identifier, password } = credentials;

    // Determinamos si el identificador es un email y construimos el objeto de datos
    const isEmail = identifier.includes('@');
    const loginData = {
      password,
      [isEmail ? 'email' : 'username']: identifier
    };

    try {
      const response = await login(loginData); // Usamos la función `login` importada
      
      console.log("Respuesta del login:", response.data); // Para depuración
      
      // Guardar los datos del usuario enriquecidos
      const userData = {
        ...response.data.user,
        token: response.data.user.token
      };
      
      localStorage.setItem('usuario', JSON.stringify(userData));
      
      // Obtener datos completos del usuario
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
      // Capturamos y establecemos el mensaje de error para mostrarlo en la UI
      const message = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // El hook retorna el estado y la función para que el componente los utilice
  return { login: loginUser, loading, error, setError };
};
