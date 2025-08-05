import React, { useEffect } from 'react';
import { useProfileForm } from '../../shared/hooks/useProfileForm';
import { Alert } from '../ui/Alert';

export const ProfileForm = ({ user, setUser }) => {
    const {
        formData,
        loading,
        errors,
        success,
        error,
        handleChange,
        handleSubmit,
        clearMessages,
        hasChanges
    } = useProfileForm(user, setUser);

    // Limpiar mensajes después de 5 segundos
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                clearMessages();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error, clearMessages]);

    return (
        <div>
            {success && <Alert type="success" message={success} />}
            {error && <Alert type="error" message={error} />}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        required
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        required
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                        required
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                </div>
                
                <button
                    type="submit"
                    disabled={loading || !hasChanges}
                    className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {loading 
                        ? 'Guardando...' 
                        : hasChanges 
                            ? 'Guardar Cambios' 
                            : 'Sin Cambios'
                    }
                </button>
            </form>
        </div>
    );
};