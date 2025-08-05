import { useState } from 'react';
import { updatePassword } from '../../services/api'; // Importar la función de la API

export const usePasswordForm = (user) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensajes al cambiar el formulario
    if (error || success) {
      clearMessages();
    }
  };

  const hasValidPasswordData = () => {
    return (
      passwordData.currentPassword.trim() !== '' &&
      passwordData.newPassword.trim() !== '' &&
      passwordData.confirmPassword.trim() !== '' &&
      passwordData.newPassword === passwordData.confirmPassword &&
      // La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
      passwordData.newPassword.length >= 8 &&
      /[A-Z]/.test(passwordData.newPassword) &&
      /[a-z]/.test(passwordData.newPassword) &&
      /\d/.test(passwordData.newPassword) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)
    );
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (!hasValidPasswordData()) {
      setError('Por favor, verifica que la contraseña cumpla con todos los requisitos y que ambas contraseñas coincidan');
      return { success: false };
    }
    
    setLoading(true);
    
    try {
      const response = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setSuccess('Contraseña actualizada correctamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar contraseña:', err);
      
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.msg || 
                       'Error al actualizar la contraseña. Verifica que la contraseña actual sea correcta.';
      
      setError(errorMsg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    passwordData,
    showCurrentPassword,
    showNewPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    handlePasswordChange,
    handlePasswordSubmit,
    hasValidPasswordData,
    loading,
    success,
    error,
    clearMessages
  };
};