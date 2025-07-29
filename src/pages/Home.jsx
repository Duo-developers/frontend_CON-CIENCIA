export function Home() {
  return (
    <div className="bg-light-bg text-dark-text font-inter">
      {/* Hero Section */}
      <section id="inicio" className="relative">
        <div className="container mx-auto px-6 py-12">
          <div className="relative text-white rounded-2xl overflow-hidden">
            {/* Video Principal */}
            <video 
              className="w-full h-auto min-h-[500px] md:min-h-[600px] object-cover rounded-2xl"
              autoPlay 
              muted
              loop 
              playsInline
            >
              <source src="https://res.cloudinary.com/dwc4ynoj9/video/upload/v1752970437/Video_Listo_Biolog%C3%ADa_Por_Favor_i0jt8f.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            
            {/* Overlay sutil solo para el texto */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl text-white">
                  Bienvenido a CON-CIENCIA
                </h1>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-xl text-white">
                  Fomentando la curiosidad y el pensamiento crítico a través de la ciencia
                </p>
                <a 
                  href="#sobre-nosotros" 
                  className="bg-white/90 text-primary-blue px-8 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 inline-block hover:scale-105 shadow-xl backdrop-blur-sm"
                >
                  Conocer Más
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nosotros" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-8 text-center">
              Sobre Nosotros
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-medium-text text-lg leading-relaxed mb-6">
                  CON-CIENCIA es una plataforma dedicada a acercar la ciencia a todos. Creemos que el conocimiento científico debe ser accesible, comprensible y emocionante para personas de todas las edades.
                </p>
                <p className="text-medium-text text-lg leading-relaxed">
                  A través de artículos, eventos y recursos educativos, fomentamos la curiosidad y el pensamiento crítico en nuestra comunidad.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/3b82f6/ffffff?text=Sobre+Nosotros" 
                  alt="Sobre CON-CIENCIA" 
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 bg-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-8 text-center">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blog Científico */}
              <div className="bg-light-bg border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-4">Blog Científico</h3>
                <p className="text-medium-text">
                  Artículos especializados en diversas áreas de la ciencia, escritos por expertos para todos los niveles.
                </p>
              </div>
              
              {/* Eventos Científicos */}
              <div className="bg-light-bg border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-4">Eventos Científicos</h3>
                <p className="text-medium-text">
                  Conferencias, talleres y olimpiadas para conectar con la comunidad científica y aprender juntos.
                </p>
              </div>
              
              {/* Recursos Educativos */}
              <div className="bg-light-bg border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-4">Recursos Educativos</h3>
                <p className="text-medium-text">
                  Materiales didácticos y herramientas para estudiantes, profesores y entusiastas de la ciencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}