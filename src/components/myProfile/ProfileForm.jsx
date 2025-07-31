import React from 'react';
import { useProfileForm } from '../../shared/hooks/useProfileForm';

export const ProfileForm = () => {
  const {
    profileData,
    handleProfileChange,
    handleProfileSubmit,
    hasProfileChanges,
    loading
  } = useProfileForm();
  
  return (
    <form onSubmit={handleProfileSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={profileData.name}
          onChange={handleProfileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          onChange={handleProfileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={profileData.username}
          onChange={handleProfileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || !hasProfileChanges()}
        className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Actualizando...' : hasProfileChanges() ? 'Actualizar Información' : 'Sin Cambios'}
      </button>
    </form>
  );
};