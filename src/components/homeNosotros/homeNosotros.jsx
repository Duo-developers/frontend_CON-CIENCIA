import React from 'react';

export default function SobreNosotros() {
  return (
    <main className="bg-light-bg text-dark-text font-inter min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text leading-tight">Nuestra Misión</h1>
          <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">
            Creemos que la ciencia es la herramienta más poderosa para entender el universo y mejorar nuestro mundo.
            Nuestra misión es hacerla accesible, comprensible y emocionante para todos.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-dark-text mb-4">Un Puente Hacia el Conocimiento</h2>
            <p className="text-medium-text mb-4 leading-relaxed">
            En CON-CIENCIA, nos dedicamos a derribar las barreras que separan a las personas del conocimiento
            científico. Creemos firmemente que la ciencia no debe estar reservada solo para académicos o
            especialistas, sino que debe ser un patrimonio compartido por toda la humanidad.
            </p>
            <p className="text-medium-text leading-relaxed">
            A través de contenido cuidadosamente elaborado, eventos interactivos y una comunidad vibrante,
            transformamos conceptos complejos en experiencias comprensibles y fascinantes. Nuestro objetivo es
            despertar la curiosidad natural que todos llevamos dentro y fomentar el pensamiento crítico que nuestra
            sociedad tanto necesita.
            </p>
        </div>

        <div className="order-1 md:order-2">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-yellow-400 rounded-2xl shadow-lg p-39">
            <h2 className="text-white text-6xl md:text-7xl font-extrabold tracking-wider">Misión</h2>
            </div>
        </div>
        </section>

        <section>
          <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-text">Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-medium-text">Las mentes detrás de la plataforma.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 justify-center">
            <div className="bg-surface border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">DR</span>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-2">Dr. Ana Rodríguez</h3>
              <p className="text-primary-blue font-semibold mb-3">Directora de Contenido Científico</p>
              <p className="text-medium-text text-sm leading-relaxed">
                Física teórica con más de 15 años de experiencia en divulgación científica. Especializada en hacer
                accesibles los conceptos más complejos del universo.
              </p>
            </div>

            <div className="bg-surface border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">CM</span>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-2">Carlos Mendoza</h3>
              <p className="text-secondary-green font-semibold mb-3">Coordinador de Eventos</p>
              <p className="text-medium-text text-sm leading-relaxed">
                Biólogo molecular y educador apasionado. Se encarga de crear experiencias de aprendizaje memorables a
                través de eventos y talleres interactivos.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
            <p className="max-w-2xl mx-auto mb-6 text-blue-100">
              Forma parte de una comunidad global de curiosos, estudiantes, educadores y profesionales que comparten la
              pasión por el conocimiento científico. Juntos, podemos construir un futuro más informado y consciente.
            </p>
            <a
              href="/"
              className="bg-white text-primary-blue px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-transform duration-300 inline-block hover:scale-105"
            >
              Explorar Contenido
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}