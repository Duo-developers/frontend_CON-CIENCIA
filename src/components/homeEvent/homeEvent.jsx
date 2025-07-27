import React from 'react';

export default function EventosPage() {
  const eventos = [
    {
      id: 1,
      dia: '25',
      mes: 'Julio',
      anio: '2025',
      tipo: 'Conferencia',
      ubicacion: 'En línea',
      titulo: 'Conferencia Internacional de Física Cuántica',
      descripcion:
        'Una conferencia magistral sobre los últimos avances en computación cuántica y sus aplicaciones en el mundo real. Expertos internacionales compartirán sus investigaciones más recientes.',
      horario: '10:00 AM - 6:00 PM',
      color: 'blue-500',
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      link: '#',
      boton: 'Registrarse',
    },
    {
      id: 2,
      dia: '02',
      mes: 'Agosto',
      anio: '2025',
      tipo: 'Taller',
      ubicacion: 'CDMX, México',
      titulo: 'Taller de Biotecnología y CRISPR',
      descripcion:
        'Taller práctico sobre técnicas de ingeniería genética usando CRISPR. Incluye laboratorio práctico y discusiones sobre ética en biotecnología.',
      horario: '9:00 AM - 5:00 PM',
      color: 'green-500',
      bg: 'bg-green-100',
      text: 'text-green-600',
      link: '#',
      boton: 'Registrarse',
    },
    {
      id: 3,
      dia: '15',
      mes: 'Agosto',
      anio: '2025',
      tipo: 'Olimpiada',
      ubicacion: 'Múltiples sedes',
      titulo: 'Olimpiada Nacional de Ciencias',
      descripcion:
        'Competencia nacional para estudiantes de nivel medio y superior. Categorías en Física, Química, Biología y Matemáticas. ¡Premios y becas para los ganadores!',
      horario: 'Todo el día',
      color: 'sky-500',
      bg: 'bg-sky-100',
      text: 'text-sky-600',
      link: '#',
      boton: 'Más información',
    },
  ];

  return (
    <div className="bg-light-bg text-dark-text font-inter min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text leading-tight">
            Próximos Eventos Científicos
          </h1>
          <p className="mt-4 text-lg text-medium-text max-w-3xl mx-auto">
            Explora conferencias, talleres y olimpiadas. ¡No te pierdas la oportunidad de aprender y conectar con la comunidad científica!
          </p>
        </header>

        <div className="space-y-8">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-lg"
            >
              {/* Columna de fecha con color pálido */}
              <div className={`${evento.bg} md:w-1/4 flex flex-col items-center justify-center p-6 text-center`}>
                <div className={`text-3xl font-bold ${evento.text}`}>{evento.dia}</div>
                <div className={`text-sm font-semibold ${evento.text} uppercase`}>{evento.mes}</div>
                <div className="text-xs text-medium-text mt-1">{evento.anio}</div>
              </div>

              {/* Contenido principal blanco */}
              <div className="bg-white p-6 flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`bg-${evento.color} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                    {evento.tipo}
                  </span>
                  <span className="text-sm text-medium-text">{evento.ubicacion}</span>
                </div>
                <h3 className="text-2xl font-bold text-dark-text mb-3">{evento.titulo}</h3>
                <p className="text-medium-text mb-4">{evento.descripcion}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-medium-text mb-2 sm:mb-0">
                    ⏰ {evento.horario}
                  </div>
                  <a
                    href={evento.link}
                    className={`bg-${evento.color} text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors font-semibold text-sm`}
                  >
                    {evento.boton}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}