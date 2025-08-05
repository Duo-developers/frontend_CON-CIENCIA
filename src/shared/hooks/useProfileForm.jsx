import { useState, useEffect } from 'react';
import { updateUser } from '../../services/api';
import { validateName, validateEmail, validateUsername } from '../validators/userValidators';

export const useProfileForm = (user, setUser) => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
    });
    
    // Estado para los datos originales (para comparar cambios)
    const [originalData, setOriginalData] = useState({
        name: '',
        email: '',
        username: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Inicializar datos cuando el usuario se carga o cambia
    useEffect(() => {
        if (user) {
            // Inicializar formData y originalData con los datos del usuario
            const userData = {
                name: user.name || '',
                email: user.email || '',
                username: user.username || '',
            };
            
            setFormData(userData);
            setOriginalData(userData);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Limpiar errores al modificar un campo
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;
        
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        
        const usernameError = validateUsername(formData.username);
        if (usernameError) newErrors.username = usernameError;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearMessages = () => {
        setSuccess('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        
        if (!validateForm()) return;
        
        // Comprobar exactamente qué campos cambiaron
        const changedFields = {};
        let hasActualChanges = false;
        
        if (formData.name !== originalData.name) {
            changedFields.name = formData.name;
            hasActualChanges = true;
        }
        
        if (formData.username !== originalData.username) {
            changedFields.username = formData.username;
            hasActualChanges = true;
        }
        
        // Solo incluir el email si realmente cambió
        if (formData.email !== originalData.email) {
            changedFields.email = formData.email;
            hasActualChanges = true;
        }
        
        // Si no hay cambios reales, mostrar mensaje y no hacer nada
        if (!hasActualChanges) {
            setSuccess('No se detectaron cambios para guardar');
            return;
        }
        
        setLoading(true);
        try {
            const response = await updateUser(changedFields);
            
            if (response && response.user) {
                // Actualizar datos del usuario en localStorage
                const userData = JSON.parse(localStorage.getItem('usuario'));
                if (userData) {
                    const updatedUserData = {
                        ...userData,
                        name: response.user.name,
                        email: response.user.email,
                        username: response.user.username
                    };
                    localStorage.setItem('usuario', JSON.stringify(updatedUserData));
                }
                
                // Actualizar el estado del usuario en el componente padre
                if (setUser) {
                    setUser(prevUser => ({
                        ...prevUser,
                        name: response.user.name,
                        email: response.user.email,
                        username: response.user.username
                    }));
                }
                
                // Actualizar los datos originales con los nuevos valores
                setOriginalData({
                    name: response.user.name,
                    email: response.user.email,
                    username: response.user.username
                });
                
                setSuccess('Información actualizada correctamente');
            }
        } catch (err) {
            console.error('Error al actualizar perfil:', err);
            
            let errorMessage = 'Error al actualizar la información';
            
            // Manejar errores específicos
            if (err.response && err.response.data) {
                if (err.response.data.errors && err.response.data.errors.length > 0) {
                    errorMessage = err.response.data.errors.map(e => e.msg).join(', ');
                } else {
                    errorMessage = err.response.data.msg || err.response.data.message || errorMessage;
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Determinar si hay algún cambio para activar/desactivar el botón de guardar
    const hasChanges = 
        formData.name !== originalData.name ||
        formData.email !== originalData.email ||
        formData.username !== originalData.username;

    return {
        formData,
        loading,
        errors,
        success,
        error,
        handleChange,
        handleSubmit,
        clearMessages,
        hasChanges
    };
};