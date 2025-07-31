import React from 'react';

export const TeacherHeader = ({ activeTab, onCreateClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {activeTab === 'articles' ? 'Gestión de Artículos' : 'Gestión de Eventos'}
      </h2>
      <button
        onClick={onCreateClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Nuevo {activeTab === 'articles' ? 'Artículo' : 'Evento'}
      </button>
    </div>
  );
};
