import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/context/useAuth';
import { useLogout } from '../shared/hooks/useLogout';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, isLoading } = useAuth();
  const { logout } = useLogout();
  const profileMenuRef = useRef(null);

  // Cierra el menú de perfil si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Componente para el avatar del usuario
  const UserAvatar = ({ user }) => {
    console.log("Datos de usuario para avatar:", user); // Para depuración
    
    return (
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-primary-blue hover:border-blue-700 transition-colors shadow-md">
        {user && user.perfil ? (
          <img src={user.perfil} alt={user.username || 'Usuario'} className="w-full h-full object-cover" />
        ) : (
          <span className="font-bold text-lg text-primary-blue">
            {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </span>
        )}
      </div>
    );
  };

  // Renderiza el botón de CON-CIENCIA STUDIO según el rol del usuario
  const renderStudioButton = () => {
    if (!isLoggedIn || !user || !user.role) return null;

    if (user.role === 'TEACHER_ROLE') {
      return (
        <Link 
          to="/teacher-studio" 
          className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2 shadow-md mr-4 transition-transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          <span className="text-white drop-shadow-md tracking-wide">CON-CIENCIA STUDIO</span>
        </Link>
      );
    } else if (user.role === 'ADMIN_ROLE') {
      return (
        <Link 
          to="/admin-studio" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 shadow-md mr-4 transition-transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-white drop-shadow-md tracking-wide">CON-CIENCIA STUDIO</span>
        </Link>
      );
    }
    
    return null;
  };

  // Renderiza la sección de autenticación (escritorio)
  const renderAuthSection = () => {
    if (isLoading) {
      return <div className="text-sm text-gray-500">Cargando...</div>;
    }

    if (isLoggedIn && user) {
      return (
        <div className="flex items-center">
          {renderStudioButton()}
          <div className="relative hidden md:block" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="relative flex items-center justify-center focus:outline-none"
              aria-label="Abrir menú de usuario"
            >
              <UserAvatar user={user} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <span className={`w-2 h-2 rounded-full ${isProfileMenuOpen ? 'bg-red-500' : 'bg-green-500'}`}></span>
              </span>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-dark-bg rounded-xl shadow-xl z-50 text-white overflow-hidden border border-gray-700 animate-fadeIn">
                <div className="p-4 border-b border-gray-700 flex items-center gap-4 bg-gray-800">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-blue-400">
                    {user && user.perfil ? 
                      <img src={user.perfil} alt={user.username || 'Usuario'} className="w-full h-full object-cover" /> : 
                      <span className="font-bold text-xl text-white">
                        {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </span>
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user && user.name ? user.name : 'Usuario'}</p>
                    <p className="text-sm text-blue-300">@{user && user.username ? user.username : 'usuario'}</p>
                  </div>
                </div>
                <div className="px-3 py-2 space-y-2">
                  <Link 
                    to="/mi-cuenta"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mi Cuenta
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-center px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-md border border-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-medium-text hover:text-primary-blue transition-colors duration-300">Login</Link>
        <Link to="/register" className="register-button px-4 py-2 rounded-full hover:bg-blue-700 transition-transform duration-300 hover:scale-105">Register</Link>
      </div>
    );
  };
  
  // Renderiza la sección de autenticación (móvil)
  const renderMobileAuthSection = () => {
    if (isLoading) {
      return <div className="text-sm text-gray-500 px-6 py-2">Cargando...</div>;
    }

    if (isLoggedIn && user) {
      return (
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <div className="px-6 py-3 flex items-center gap-3 bg-blue-50 rounded-lg mx-2">
            <UserAvatar user={user} />
            <div>
              <p className="font-semibold text-dark-text">{user && user.name ? user.name : 'Usuario'}</p>
              <p className="text-sm text-primary-blue">@{user && user.username ? user.username : 'usuario'}</p>
            </div>
          </div>
          
          {/* Botón de CON-CIENCIA STUDIO para móvil según rol */}
          {user.role === 'TEACHER_ROLE' && (
            <Link 
              to="/teacher-studio" 
              onClick={() => setIsMenuOpen(false)}
              className="mx-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2 shadow-md transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <span className="text-white drop-shadow-md tracking-wide">CON-CIENCIA STUDIO</span>
            </Link>
          )}
          
          {user.role === 'ADMIN_ROLE' && (
            <Link 
              to="/admin-studio" 
              onClick={() => setIsMenuOpen(false)}
              className="mx-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2 shadow-md transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-white drop-shadow-md tracking-wide">CON-CIENCIA STUDIO</span>
            </Link>
          )}
          
          <Link 
            to="/mi-cuenta" 
            onClick={() => setIsMenuOpen(false)}
            className="mx-2 bg-gray-600 text-white font-medium py-3 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mi Cuenta
          </Link>
          
          <button 
            onClick={() => { logout(); setIsMenuOpen(false); }}
            className="w-full text-center bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-colors duration-300 font-bold flex items-center justify-center gap-3 mx-2 shadow-lg border-2 border-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar Sesión
          </button>
        </div>
      );
    }

    return (
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-medium-text hover:text-primary-blue transition-colors duration-300 px-6 py-2">Login</Link>
        <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block register-button mx-6 my-2 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 text-center">Register</Link>
      </div>
    );
  };

  return (
    <header className="bg-light-bg/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967389/Logo_bkphtw.png" 
            alt="Logo de CON-CIENCIA" 
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-dark-text tracking-tighter">CON-CIENCIA</span>
        </Link>
        
        {/* Navegación de escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors duration-300 ${isActive('/') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Inicio</Link>
          <Link to="/blog" className={`transition-colors duration-300 ${isActive('/blog') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Blog</Link>
          <Link to="/eventos" className={`transition-colors duration-300 ${isActive('/eventos') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Eventos</Link>
          <Link to="/sobre-nosotros" className={`transition-colors duration-300 ${isActive('/sobre-nosotros') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Sobre Nosotros</Link>
        </div>

        {/* Sección de autenticación dinámica */}
        <div className="flex items-center space-x-4">
          {renderAuthSection()}
        </div>

        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-medium-text hover:text-primary-blue"
            id="mobile-menu-button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-light-bg border-t border-gray-200" id="mobile-menu">
          <div className="px-6 py-4 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block transition-colors duration-300 ${isActive('/') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Inicio</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className={`block transition-colors duration-300 ${isActive('/blog') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Blog</Link>
            <Link to="/eventos" onClick={() => setIsMenuOpen(false)} className={`block transition-colors duration-300 ${isActive('/eventos') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Eventos</Link>
            <Link to="/sobre-nosotros" onClick={() => setIsMenuOpen(false)} className={`block transition-colors duration-300 ${isActive('/sobre-nosotros') ? 'text-primary-blue font-semibold' : 'text-medium-text hover:text-primary-blue'}`}>Sobre Nosotros</Link>
            {renderMobileAuthSection()}
          </div>
        </div>
      )}
    </header>
  );
}
