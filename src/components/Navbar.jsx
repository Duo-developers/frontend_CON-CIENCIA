import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/context/useAuth';
import { useLogout } from '../shared/hooks/useLogout';

// Memoized UserAvatar component
const UserAvatar = memo(({ user }) => {
  const avatarContent = useMemo(() => {
    if (user && user.perfil) {
      return (
        <img 
          src={user.perfil} 
          alt={user.username || 'Usuario'} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }
    return (
      <span className="font-bold text-lg text-primary-blue">
        {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
      </span>
    );
  }, [user?.perfil, user?.username]);

  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-primary-blue hover:border-blue-700 transition-colors shadow-md">
      {avatarContent}
    </div>
  );
});

UserAvatar.displayName = 'UserAvatar';

// Memoized Studio Button component
const StudioButton = memo(({ role, to, gradientClasses, icon }) => (
  <Link 
    to={to} 
    className={`${gradientClasses} text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md mr-4 transition-transform hover:scale-105`}
  >
    {icon}
    <span className="text-white drop-shadow-md tracking-wide">CON-CIENCIA STUDIO</span>
  </Link>
));

StudioButton.displayName = 'StudioButton';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, isLoading } = useAuth();
  const { logout } = useLogout();
  const profileMenuRef = useRef(null);

  // Memoized active path check
  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  // Memoized studio button rendering
  const studioButton = useMemo(() => {
    if (!isLoggedIn || !user || !user.role) return null;

    if (user.role === 'TEACHER_ROLE') {
      return (
        <StudioButton
          role={user.role}
          to="/teacher-studio"
          gradientClasses="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
        />
      );
    } else if (user.role === 'ADMIN_ROLE') {
      return (
        <StudioButton
          role={user.role}
          to="/admin-studio"
          gradientClasses="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      );
    }
    
    return null;
  }, [isLoggedIn, user?.role]);

  // Memoized toggle functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen(prev => !prev);
  }, []);

  // Click outside handler
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
  }, []);

  // Memoized auth section rendering
  const authSection = useMemo(() => {
    if (isLoading) {
      return <div className="text-sm text-gray-500">Cargando...</div>;
    }

    if (isLoggedIn && user) {
      return (
        <div className="flex items-center">
          {studioButton}
          <div className="relative hidden md:block" ref={profileMenuRef}>
            <button 
              onClick={toggleProfileMenu}
              className="relative flex items-center justify-center focus:outline-none"
              aria-label="Abrir menú de usuario"
            >
              <UserAvatar user={user} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <span className={`w-2 h-2 rounded-full ${isProfileMenuOpen ? 'bg-red-500' : 'bg-green-500'}`}></span>
              </span>
            </button>
            
            {/* Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link 
          to="/login" 
          className="text-dark-text hover:text-primary-blue font-medium transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link 
          to="/register" 
          className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Registrarse
        </Link>
      </div>
    );
  }, [isLoading, isLoggedIn, user, studioButton, isProfileMenuOpen, toggleProfileMenu, logout]);

  // Memoized mobile auth section
  const mobileAuthSection = useMemo(() => {
    if (isLoading) {
      return <div className="text-sm text-gray-500 py-4">Cargando...</div>;
    }

    if (isLoggedIn && user) {
      return (
        <div className="py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <UserAvatar user={user} />
            <div>
              <p className="font-semibold text-dark-text">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          {studioButton && (
            <div className="mb-4">
              {studioButton}
            </div>
          )}
          <button
            onClick={logout}
            className="w-full text-left py-2 text-dark-text hover:text-primary-blue transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      );
    }

    return (
      <div className="py-4 border-t border-gray-200 space-y-3">
        <Link 
          to="/login" 
          className="block text-dark-text hover:text-primary-blue transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link 
          to="/register" 
          className="block bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Registrarse
        </Link>
      </div>
    );
  }, [isLoading, isLoggedIn, user, studioButton, logout]);

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
          <Link to="/" className={`font-medium transition-colors duration-300 ${isActive('/') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'}`}>Inicio</Link>
          <Link to="/blog" className={`font-medium transition-colors duration-300 ${isActive('/blog') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'}`}>Blog</Link>
          <Link to="/eventos" className={`font-medium transition-colors duration-300 ${isActive('/eventos') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'}`}>Eventos</Link>
          <Link to="/sobre-nosotros" className={`font-medium transition-colors duration-300 ${isActive('/sobre-nosotros') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'}`}>Sobre Nosotros</Link>
        </div>

        {/* Sección de autenticación dinámica */}
        {authSection}

        {/* Botón de menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-primary-blue">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-light-bg border-t border-gray-200">
          <div className="px-2 py-4 space-y-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block font-medium rounded-lg px-6 py-2 ${isActive('/') ? 'text-primary-blue bg-blue-50' : 'text-gray-600 hover:text-primary-blue hover:bg-gray-50'} transition-colors duration-300`}>Inicio</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className={`block font-medium rounded-lg px-6 py-2 ${isActive('/blog') ? 'text-primary-blue bg-blue-50' : 'text-gray-600 hover:text-primary-blue hover:bg-gray-50'} transition-colors duration-300`}>Blog</Link>
            <Link to="/eventos" onClick={() => setIsMenuOpen(false)} className={`block font-medium rounded-lg px-6 py-2 ${isActive('/eventos') ? 'text-primary-blue bg-blue-50' : 'text-gray-600 hover:text-primary-blue hover:bg-gray-50'} transition-colors duration-300`}>Eventos</Link>
            <Link to="/sobre-nosotros" onClick={() => setIsMenuOpen(false)} className={`block font-medium rounded-lg px-6 py-2 ${isActive('/sobre-nosotros') ? 'text-primary-blue bg-blue-50' : 'text-gray-600 hover:text-primary-blue hover:bg-gray-50'} transition-colors duration-300`}>Sobre Nosotros</Link>
            {mobileAuthSection}
          </div>
        </div>
      )}
    </header>
  );
}
