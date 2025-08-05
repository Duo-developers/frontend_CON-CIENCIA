import React, { useEffect } from 'react';
import { useProfileImage } from '../../shared/hooks/useProfileImage';
import { UserAvatar } from './UserAvatar';

export const ImageUploader = ({ user, setUser }) => {
  const {
    profileImage,
    previewImage,
    dragActive,
    fileInputRef,
    handleImageChange,
    handleDrag,
    handleDrop,
    resetImage,
    handleImageSubmit,
    handleRemoveProfilePicture,
    loading,
    success,
    error,
    clearMessages
  } = useProfileImage(user, setUser);
  
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
    <div className="space-y-6">
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex flex-col items-center">
        <UserAvatar 
          user={user} 
          previewImage={previewImage} 
          size="large" 
        />
        <p className="text-sm text-gray-500 mt-2">Foto de perfil actual</p>
      </div>

      <form onSubmit={handleImageSubmit} className="space-y-4">
        <div 
          className={`relative border-2 ${dragActive ? 'border-primary-blue bg-blue-50' : 'border-dashed border-gray-300'} rounded-lg p-6 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input
            type="file"
            id="profileImage"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-700 mb-1">
              {previewImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </p>
            <p className="text-sm text-gray-500">
              Arrastra y suelta una imagen aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
            </p>
          </div>
        </div>

        {previewImage && (
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Vista previa</p>
            <UserAvatar user={user} previewImage={previewImage} size="large" />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={resetImage}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading || !profileImage}
            className="flex-1 bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Subiendo...' : profileImage ? 'Actualizar Foto de Perfil' : 'Selecciona una imagen'}
          </button>
          
          {user?.perfil && (
            <button
              type="button"
              onClick={handleRemoveProfilePicture}
              disabled={loading}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Eliminando...' : 'Eliminar foto'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};