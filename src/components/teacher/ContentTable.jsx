import React from 'react';

export const ContentTable = ({ 
  activeTab, 
  items, 
  loadingArticles, 
  loadingEvents, 
  onEdit, 
  onDelete,
  onCreateClick 
}) => {
  if (loadingArticles && activeTab === 'articles') {
    return <p>Cargando artículos...</p>;
  }

  if (loadingEvents && activeTab === 'events') {
    return <p>Cargando eventos...</p>;
  }

  return (
    <>
      {/* Header con botón crear */}
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

      {/* Tabla */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {activeTab === 'articles' ? (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3">Acciones</th>
              </>
            ) : (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lugar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3">Acciones</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No hay {activeTab === 'articles' ? 'artículos' : 'eventos'} registrados aún.
              </td>
            </tr>
          )}
          {items.map(item => (
            <tr key={activeTab === 'articles' ? item.aid : item.eid}>
              {activeTab === 'articles' ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.status ? 'Publicado' : 'Borrador'}
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                </>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(activeTab === 'articles' ? item.aid : item.eid)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
