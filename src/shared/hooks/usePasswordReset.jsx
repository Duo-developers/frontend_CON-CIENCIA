import { useState } from 'react';
import { requestPasswordReset, resetPassword } from '../../services/api';
import toast from 'react-hot-toast';

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const requestReset = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await requestPasswordReset(email);
      
      setSuccess(true);
      toast.success('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña.');
      
      return { success: true };
    } catch (err) {
      console.error('Error al solicitar restablecimiento:', err);
      
      const errorMessage = err.response?.data?.message || 
                         'Ha ocurrido un error al procesar tu solicitud.';
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const confirmReset = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await resetPassword(token, newPassword);
      
      setSuccess(true);
      toast.success('Contraseña restablecida correctamente.');
      
      return { 
        success: true,
        token: response.token
      };
    } catch (err) {
      console.error('Error al restablecer contraseña:', err);
      
      const errorMessage = err.response?.data?.message || 
                          'Ha ocurrido un error al restablecer tu contraseña.';
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    loading,
    success,
    error,
    requestReset,
    confirmReset,
    clearState
  };
};