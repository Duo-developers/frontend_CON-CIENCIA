import React, { useEffect } from 'react';
import { usePasswordForm } from '../../shared/hooks/usePasswordForm';
import { Alert } from '../ui/Alert'; // Asegúrate de importar el componente Alert

export const PasswordForm = ({ user }) => {
  const {
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
  } = usePasswordForm(user);
  
  // Limpiar mensajes después de 5 segundos (similar a ProfileForm)
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
      
      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña Actual
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showCurrentPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showNewPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
          </p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            required
          />
          {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !hasValidPasswordData()}
          className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
};