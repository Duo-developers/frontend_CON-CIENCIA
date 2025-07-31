import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../../shared/hooks/useRegister'; // Importamos el hook que contiene la lógica

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const EyeIcon = ({ show }) => show ? <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878l-3.37-3.37m6.878 6.878l3.37 3.37" /></svg>;

export default function Register() {
  const { formData, isLoading, error, handleChange, handleFileChange, handleSubmit } = useRegister();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-surface font-inter">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-dark-text">Crea tu Cuenta en CON-CIENCIA</h2>
          <p className="mt-2 text-sm text-medium-text">
            ¿Ya eres parte de la comunidad?{' '}
            <Link to="/login" className="font-medium text-primary-blue hover:text-blue-700 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
              <input name="username" value={formData.username} onChange={handleChange} required className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm" placeholder="Nombre de usuario" />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                <input name="name" value={formData.name} onChange={handleChange} required className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm" placeholder="Nombre completo" />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MailIcon /></div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm" placeholder="Correo electrónico" />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm" placeholder="Contraseña" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><EyeIcon show={showPassword} /></button>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="pl-10 block w-full px-3 py-3 border border-gray-300 text-dark-text rounded-lg focus:ring-primary-blue focus:border-primary-blue sm:text-sm" placeholder="Confirmar contraseña" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><EyeIcon show={showConfirm} /></button>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text">Imagen de Perfil (Opcional)</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-blue hover:file:bg-blue-100 transition-colors"/>
            </div>
          </div>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm"><p>{error}</p></div>}

          <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300">
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </main>
  );
}
