import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePasswordReset } from '../../shared/hooks/usePasswordReset';
import { useAuth } from '../../shared/context/useAuth';

// Componente de icono para la contraseña
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Componente de icono para mostrar/ocultar contraseña
const EyeIcon = ({ show }) => show ? (
  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { loading, success, error, confirmReset } = usePasswordReset();
  const { updateAuthState } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    
    // Validación más completa
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSymbol)) {
      setPasswordError('La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un símbolo');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    const result = await confirmReset(token, password);
    
    if (result.success && result.token) {
      // Si la respuesta incluye un token, podemos iniciar sesión automáticamente
      // Solo guardamos el token en localStorage
      localStorage.setItem('usuario', JSON.stringify({ token: result.token }));
      
      // En vez de actualizar el estado directamente, lo verificamos en el servidor
      updateAuthState();
      
      // Redirigir después de un breve retraso para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-dark-text">Restablece tu Contraseña</h2>
        <p className="mt-2 text-sm text-medium-text">
          Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-5 rounded-md mb-6">
          <p className="font-medium mb-1">¡Contraseña restablecida!</p>
          <p className="text-sm">
            Tu contraseña ha sido actualizada correctamente.
            Estás siendo redirigido automáticamente...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm pr-10"
                placeholder="Nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm pr-10"
                placeholder="Confirmar contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon show={showConfirmPassword} />
              </button>
            </div>
          </div>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {passwordError}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm font-medium text-primary-blue hover:text-blue-700 transition-colors">
              Volver al inicio de sesión
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Procesando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      )}
    </div>
  );
}