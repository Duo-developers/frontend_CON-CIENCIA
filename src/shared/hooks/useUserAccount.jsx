import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { authService } from '../../services/api';
import toast from 'react-hot-toast';

export function useUserAccount() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const filteredData = {};
      
      if (userData.name && userData.name !== user.name) {
        filteredData.name = userData.name;
      }
      if (userData.email && userData.email !== user.email) {
        filteredData.email = userData.email;
      }
      if (userData.username && userData.username !== user.username) {
        filteredData.username = userData.username;
      }

      if (Object.keys(filteredData).length === 0) {
        toast.success('No hay cambios para guardar');
        return { success: true, user: user };
      }

      console.log('Datos a enviar al backend:', filteredData);
      const response = await authService.updateUser(filteredData);
      
      if (response.success) {
        const updatedUser = {
          ...user,
          ...response.user
        };
        updateUser(updatedUser);
        toast.success('Perfil actualizado correctamente');
        return { success: true, user: updatedUser };
      } else {
        throw new Error(response.msg || response.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      console.error('Error completo:', err);
      let errorMessage = 'Error al actualizar el perfil';
      
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = err.response.data.errors.map(e => e.msg).join(', ');
          errorMessage = errorMessages;
        } else {
          errorMessage = err.response.data.msg || err.response.data.message || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.updatePassword({
        currentPassword,
        newPassword
      });
      
      if (response.success || response.ok) {
        toast.success('Contraseña actualizada correctamente');
        return { success: true };
      } else {
        throw new Error(response.msg || response.message || 'Error al cambiar la contraseña');
      }
    } catch (err) {
      console.error('Error completo:', err);
      let errorMessage = 'Error al cambiar la contraseña';
      
      if (err.response && err.response.data) {
        errorMessage = err.response.data.msg || err.response.data.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProfilePicture = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file); 

      const response = await authService.updateProfilePicture(formData);
      
      if (response.success) {
        const updatedUser = { ...user, perfil: response.profilePicture };
        updateUser(updatedUser);
        toast.success('Foto de perfil actualizada correctamente');
        return { success: true, profilePicture: response.profilePicture };
      } else {
        throw new Error(response.message || 'Error al actualizar la foto de perfil');
      }
    } catch (err) {
      console.error('Error completo:', err);
      let errorMessage = 'Error al actualizar la foto de perfil';
      
      if (err.response && err.response.data) {
        errorMessage = err.response.data.msg || err.response.data.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    updateProfile,
    changePassword,
    updateProfilePicture,
    clearMessages
  };
}
