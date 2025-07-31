import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePasswordReset } from '../../shared/hooks/usePasswordReset';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { loading, success, error, requestReset } = usePasswordReset();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    await requestReset(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-dark-text">Recupera tu Contraseña</h2>
        <p className="mt-2 text-sm text-medium-text">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-5 rounded-md mb-6">
          <p className="font-medium mb-1">Solicitud enviada</p>
          <p className="text-sm">
            Si existe una cuenta asociada con {email}, recibirás un correo con instrucciones para restablecer tu contraseña.
          </p>
          <div className="mt-4">
            <Link to="/login" className="text-primary-blue font-medium hover:text-blue-700 transition-colors">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

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
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>
      )}
    </div>
  );
}