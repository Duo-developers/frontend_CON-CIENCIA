import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import toast from 'react-hot-toast';


export const useRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null); 
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { username, name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append('username', username);
    dataToSend.append('name', name);
    dataToSend.append('email', email);
    dataToSend.append('password', password);
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      await register(dataToSend);
      toast.success('¡Cuenta creada exitosamente! Serás redirigido para iniciar sesión.', {
        duration: 3000,
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Error al registrar la cuenta.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
