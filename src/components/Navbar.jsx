import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors duration-300 ${
              isActive('/') 
                ? 'text-primary-blue font-semibold' 
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Inicio
          </Link>
          <Link 
            to="/blog" 
            className={`font-medium transition-colors duration-300 ${
              isActive('/blog') 
                ? 'text-primary-blue font-semibold' 
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Blog
          </Link>
          <Link 
            to="/eventos" 
            className={`font-medium transition-colors duration-300 ${
              isActive('/eventos') 
                ? 'text-primary-blue font-semibold' 
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Eventos
          </Link>
          <Link 
            to="/sobre-nosotros" 
            className={`font-medium transition-colors duration-300 ${
              isActive('/sobre-nosotros') 
                ? 'text-primary-blue font-semibold' 
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Sobre Nosotros
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/login" 
            className="text-gray-600 hover:text-primary-blue transition-colors duration-300 font-medium"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-primary-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 font-medium"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-gray-600 hover:text-primary-blue"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-light-bg border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            <Link 
              to="/" 
              className={`block font-medium ${
                isActive('/') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'
              } transition-colors duration-300`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/blog" 
              className={`block font-medium ${
                isActive('/blog') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'
              } transition-colors duration-300`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/eventos" 
              className={`block font-medium ${
                isActive('/eventos') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'
              } transition-colors duration-300`}
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              to="/sobre-nosotros" 
              className={`block font-medium ${
                isActive('/sobre-nosotros') ? 'text-primary-blue font-semibold' : 'text-gray-600 hover:text-primary-blue'
              } transition-colors duration-300`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link 
                to="/login" 
                className="block text-gray-600 hover:text-primary-blue transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block bg-primary-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
