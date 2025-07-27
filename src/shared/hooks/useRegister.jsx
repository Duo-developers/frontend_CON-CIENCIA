import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

/**
 * Hook personalizado para gestionar la lógica del formulario de registro.
 * Encapsula el estado del formulario, el manejo de cambios, la validación
 * y la comunicación con el API.
 */
export const useRegister = () => {
  // Estado para los campos de texto del formulario.
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Estado para el archivo de imagen.
  const [imageFile, setImageFile] = useState(null);
  
  // Estados para la UI: errores y estado de carga.
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja los cambios en los inputs de texto.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null); // Limpia el error al empezar a escribir.
  };

  // Maneja la selección de un archivo de imagen.
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Procesa el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { username, name, email, password, confirmPassword } = formData;

    // Validaciones del lado del cliente.
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    // Construye el objeto FormData para enviar los datos, incluyendo la imagen.
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
      alert('¡Cuenta creada exitosamente! Serás redirigido para iniciar sesión.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Error al registrar la cuenta.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Retorna el estado y las funciones que el componente necesitará.
  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
