import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-dark-bg text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967389/Logo_bkphtw.png" 
                alt="Logo de CON-CIENCIA" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">CON-CIENCIA</span>
            </Link>
            <p className="text-sm text-gray-400">
              Fomentando la curiosidad y el pensamiento crítico.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navegación</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Recursos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Materiales
                </a>
              </li>
            </ul>
          </div>

          {/* Síguenos */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Síguenos</h4>
            <div className="flex space-x-3">
              {/* Twitter */}
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-700 hover:bg-primary-blue text-gray-400 hover:text-white rounded flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>

              {/* Twitter 2 (duplicado como en la imagen) */}
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-700 hover:bg-primary-blue text-gray-400 hover:text-white rounded flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <hr className="my-8 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          © 2025 CON-CIENCIA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
