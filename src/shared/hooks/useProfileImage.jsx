import { useState, useRef, useEffect } from 'react';
import { updateProfilePicture, removeProfilePicture } from '../../services/api';

export const useProfileImage = (user, setUser) => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Inicializar la referencia correctamente
  const fileInputRef = useRef(null);

  // Cargar imagen de perfil actual si existe
  useEffect(() => {
    if (user?.perfil) {
      setPreviewImage(user.perfil);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const validateAndSetImage = (file) => {
    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Formato de archivo no válido. Por favor, selecciona una imagen (JPG, PNG o GIF).');
      return;
    }
    
    // Validar tamaño de archivo (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. El tamaño máximo es 5MB.');
      return;
    }
    
    // Si pasa las validaciones, establecer la imagen
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetImage(e.dataTransfer.files[0]);
    }
  };

  const resetImage = () => {
    setProfileImage(null);
    setPreviewImage(user?.perfil || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileImage) {
      setError('Por favor, selecciona una imagen primero.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      
      const response = await updateProfilePicture(formData);
      
      if (response && response.success) {
        // Actualizar el usuario en el estado global
        if (setUser && user) {
          setUser({
            ...user,
            perfil: response.profilePicture
          });
          
          // Actualizar en localStorage si se almacena allí
          const storedUser = localStorage.getItem('usuario');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.perfil = response.profilePicture;
            localStorage.setItem('usuario', JSON.stringify(userData));
          }
        }
        
        setSuccess('Imagen de perfil actualizada correctamente');
        
        // Resetear el estado del formulario pero mantener la imagen actualizada
        setProfileImage(null);
        setPreviewImage(response.profilePicture);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      console.error('Error al actualizar la imagen de perfil:', err);
      setError('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await removeProfilePicture();
      
      if (response && response.success) {
        // Actualizar el usuario en el estado global
        if (setUser && user) {
          setUser({
            ...user,
            perfil: null,
            perfilPublicId: null
          });
          
          // Actualizar en localStorage si se almacena allí
          const storedUser = localStorage.getItem('usuario');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.perfil = null;
            userData.perfilPublicId = null;
            localStorage.setItem('usuario', JSON.stringify(userData));
          }
        }
        
        setSuccess('Imagen de perfil eliminada correctamente');
        setProfileImage(null);
        setPreviewImage(null);
      }
    } catch (err) {
      console.error('Error al eliminar la imagen de perfil:', err);
      setError('Error al eliminar la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    profileImage,
    previewImage,
    dragActive,
    loading,
    error,
    success,
    fileInputRef,
    handleImageChange,
    handleDrag,
    handleDrop,
    resetImage,
    handleImageSubmit,
    handleRemoveProfilePicture,
    clearMessages
  };
};