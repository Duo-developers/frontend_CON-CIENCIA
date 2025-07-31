import React from 'react';

export default function SobreNosotros() {
  return (
    <main className="bg-light-bg text-dark-text font-inter min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text leading-tight">Nuestra Misión</h1>
          <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
            Transformar la manera en que la ciencia se comparte y se consume. Nuestra misión con "CON-CIENCIA" es derribar las barreras que existen entre el conocimiento científico y la sociedad, creando un ecosistema digital que promueva la divulgación, incentive el pensamiento crítico y facilite la participación activa en eventos académicos. Buscamos ser un puente confiable y atractivo para todos los curiosos del saber.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-dark-text mb-6">Un Puente Hacia el Conocimiento</h2>
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
            <div className="w-full h-80 flex items-center justify-center bg-gradient-to-r from-blue-500 to-yellow-400 rounded-2xl shadow-lg">
              <h2 className="text-white text-6xl md:text-7xl font-extrabold tracking-wider">Misión</h2>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-text">Sobre Nosotros</h2>
            <p className="mt-4 text-lg text-medium-text max-w-4xl mx-auto leading-relaxed">
              Somos Emilio Lux y José Melgar, dos estudiantes de programación y entusiastas de la ciencia, unidos por una misma convicción: el conocimiento es una herramienta poderosa que debe estar al alcance de todos.
            </p>
          </header>

          <div className="bg-surface border border-gray-200 rounded-2xl p-8 mb-12 shadow-sm">
            <p className="text-medium-text leading-relaxed mb-4">
              "CON-CIENCIA" nació de nuestra propia experiencia y de una pregunta que nos inquietaba: ¿cómo podemos conectar a más personas en Guatemala con la belleza y la importancia de la ciencia? Como apasionados por la física, la filosofía y el desarrollo de software, sentimos la necesidad de crear este espacio donde la curiosidad científica no solo fuera bienvenida, sino celebrada.
            </p>
            <p className="text-medium-text leading-relaxed">
              Este proyecto es nuestra respuesta. Queremos que "CON-CIENCIA" sea más que una plataforma; aspiramos a construir una comunidad vibrante donde estudiantes, docentes y aficionados puedan explorar, discutir y participar activamente en el mundo del conocimiento. Estamos comprometidos con mejorar la educación y la conciencia social, y creemos firmemente que fomentar una cultura científica es el primer paso para lograrlo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center">
            <div className="bg-surface border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753454417/Photo_hg4g3o.jpg" 
                  alt="Emilio Lux"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-2">Emilio Lux</h3>
              <p className="text-primary-blue font-semibold mb-4">Fundador & Desarrollador</p>
              <p className="text-medium-text leading-relaxed">
                Estudiante de programación apasionado por la física y la filosofía. Se encarga del desarrollo técnico de la plataforma y la creación de experiencias digitales que conecten a las personas con el conocimiento científico.
              </p>
            </div>

            <div className="bg-surface border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753935610/imagen_2025-07-30_222005337_m0zwg8.png" 
                  alt="José Melgar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-2">José Melgar</h3>
              <p className="text-secondary-green font-semibold mb-4">Co-fundador & Estratega de Contenido</p>
              <p className="text-medium-text leading-relaxed">
                Apasionado por la psicología y literatura, tratando de comunicar por medio de la oratoria. Se enfoca en la estrategia de contenido y en crear experiencias educativas que inspiren el pensamiento crítico y la curiosidad científica.
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
              href="/register"
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