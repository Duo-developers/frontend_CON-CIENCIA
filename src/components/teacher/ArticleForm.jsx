import React from 'react';

export const ArticleForm = ({ editingItem, categoryOptions }) => {
  return (
    <>
      <input
        name="title"
        defaultValue={editingItem?.title || ''}
        placeholder="Título"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        name="content"
        defaultValue={editingItem?.content || ''}
        placeholder="Contenido"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={6}
        required
      />
      <input
        name="videos"
        defaultValue={editingItem?.videos?.join(', ') || ''}
        placeholder="URLs de videos (separadas por coma)"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="category"
        defaultValue={editingItem?.category || categoryOptions[0]}
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        {categoryOptions.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </>
  );
};
