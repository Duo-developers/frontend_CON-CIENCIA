import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer-dark mt-16 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="md:flex md:justify-between">
          {/* Logo y descripción */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967389/Logo_bkphtw.png" 
                alt="Logo de CON-CIENCIA" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold">CON-CIENCIA</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Fomentando la curiosidad y el pensamiento crítico.
            </p>
          </div>

          {/* Grid de columnas de información */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navegación */}
            <div>
              <h4 className="font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/sobre-nosotros" className="text-white hover:text-gray-300 transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <a href="#servicios" className="text-white hover:text-gray-300 transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-white hover:text-gray-300 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <Link to="/blog" className="text-white hover:text-gray-300 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/eventos" className="text-white hover:text-gray-300 transition-colors">
                    Eventos
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    Materiales
                  </a>
                </li>
              </ul>
            </div>

            {/* Síguenos */}
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {/* Twitter */}
                {/* Instagram */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.86.56a2.75 2.75 0 0 0-1.94 1.94C2.5 9.66 2.5 12 2.5 12s0 2.34.7 3.999a2.75 2.75 0 0 0 1.94 1.94C5.8 18.5 12 18.5 12 18.5s6.2 0 7.86-.56a2.75 2.75 0 0 0 1.94-1.94c.56-1.66.56-3.999.56-3.999s0-2.34-.56-3.999zM10 15.5v-7l6 3.5-6 3.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <hr className="my-8 border-gray-800" />

        {/* Copyright */}
        <div className="text-center text-sm text-white">
          &copy; 2025 CON-CIENCIA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
