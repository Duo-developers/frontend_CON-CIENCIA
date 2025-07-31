import React from 'react';
import { useEvents } from '../../shared/hooks/useEvents';

const CATEGORY_IMAGES = {
  Biology: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967751/fondo_ubpgox.jpg',
  Chemistry: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925664/imagen_2025-07-30_193418944_v0su64.png',
  History: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925691/imagen_2025-07-30_193446898_fbxb3j.png',
  Medicine: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925740/imagen_2025-07-30_193504785_texnit.png',
  Astronomy: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925754/imagen_2025-07-30_193548709_p9gkxe.png',
  Other: 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753926010/imagen_2025-07-30_194003683_odqc7d.png'
};

const CATEGORY_STYLES = {
  Biology: { bg: 'bg-green-100', text: 'text-green-700', pill: 'bg-green-600' },
  Chemistry: { bg: 'bg-pink-100', text: 'text-pink-700', pill: 'bg-pink-600' },
  History: { bg: 'bg-yellow-100', text: 'text-yellow-700', pill: 'bg-yellow-600' },
  Medicine: { bg: 'bg-red-100', text: 'text-red-700', pill: 'bg-red-600' },
  Astronomy: { bg: 'bg-blue-100', text: 'text-blue-700', pill: 'bg-blue-600' },
  Other: { bg: 'bg-gray-100', text: 'text-gray-700', pill: 'bg-gray-600' }
};

export default function EventosPage() {
  const { events, loading, error } = useEvents();

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('es', { month: 'long' });
    const year = d.getFullYear();
    return { day, month, year };
  };

  return (
    <div className="bg-white text-gray-800 font-inter min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Próximos Eventos Científicos
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explora conferencias, talleres y olimpiadas. ¡No te pierdas la oportunidad de aprender y conectar con la comunidad científica!
          </p>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Cargando eventos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-10">
            {events.map((e) => {
              const { day, month, year } = formatDate(e.date);
              const image = CATEGORY_IMAGES[e.category] || CATEGORY_IMAGES['Other'];
              const style = CATEGORY_STYLES[e.category] || CATEGORY_STYLES['Other'];

              return (
                <div
                  key={e.eid}
                  className={`border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow bg-white`}
                >
                  <div className={`md:w-1/5 flex flex-col items-center justify-center p-6 text-center border-r border-gray-200 ${style.bg}`}>
                    <div className={`text-4xl font-extrabold ${style.text}`}>{day}</div>
                    <div className={`text-base font-semibold uppercase tracking-wide ${style.text}`}>{month}</div>
                    <div className="text-xs text-gray-500 mt-1">{year}</div>
                  </div>

                  <div className="flex-1 p-0 md:flex md:flex-col">
                    <img
                      src={image}
                      alt={`Imagen de ${e.category}`}
                      className="w-full h-48 object-cover md:rounded-t-none"
                    />
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-white text-xs px-3 py-1 rounded-full font-semibold ${style.pill}`}>
                            {e.category}
                          </span>
                          <span className="text-sm text-gray-500">{e.location}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black">{e.name}</h3> 
                        <p className="text-gray-700 mb-4">{e.description}</p>
                      </div>

                      {e.externalLinks?.length > 0 && (
                        <div className="flex flex-wrap mt-4 gap-3">
                          {e.externalLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-green-600 text-black px-4 py-2 rounded-full transition hover:bg-green-100 text-sm font-medium"
                          >
                            {link.title}
                          </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
