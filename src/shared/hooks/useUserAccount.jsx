import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/api';
import { useAuth } from '../context/useAuth'; // Importar desde useAuth.js en lugar de AuthContext.jsx

export const useUserAccount = () => {
  const { authState } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        if (response && response.data && response.data.user) {
          console.log("Datos de usuario obtenidos:", response.data.user);
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setError('No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    if (authState?.isAuthenticated) {
      fetchUserData();
    } else {
      // Si no hay autenticación, intentar cargar desde localStorage
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          fetchUserData(); // Intentar actualizar con datos del servidor
        } catch (e) {
          console.error("Error al parsear usuario del localStorage", e);
        }
      }
      setLoading(false);
    }
  }, [authState]);

  // Esta función es necesaria para que los componentes puedan actualizar el estado del usuario
  const updateUser = (newUserData) => {
    setUser(prev => ({
      ...prev,
      ...newUserData
    }));
  };

  return {
    user,
    setUser: updateUser, // Exportando la función para actualizar el usuario
    loading,
    error,
    setError,
    success,
    setSuccess
  };
};
