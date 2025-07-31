import React from 'react';

export const ArticlesTable = ({ articles, onEdit, onDelete }) => {
  if (articles.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="text-center py-6 text-gray-500">
          No hay artículos registrados aún.
        </td>
      </tr>
    );
  }

  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          <th className="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {articles.map(item => (
          <tr key={item.aid} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.status ? 'Publicado' : 'Borrador'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900">Editar</button>
              <button onClick={() => onDelete(item.aid)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};