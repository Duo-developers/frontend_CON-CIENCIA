import React from 'react';

const CATEGORY_OPTIONS = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy',
  'Physics', 'Mathematics', 'Technology',
  'Geology and Earth Sciences', 'Social Sciences', 'Engineering', 'Other'
];

export const ArticleForm = ({ editingItem, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Título</label>
        <input
          name="title"
          defaultValue={editingItem?.title || ''}
          type="text"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Contenido</label>
        <textarea
          name="content"
          defaultValue={editingItem?.content || ''}
          rows={6}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Categoría</label>
        <select
          name="category"
          defaultValue={editingItem?.category || CATEGORY_OPTIONS[0]}
          className="w-full border rounded px-3 py-2"
          required
        >
          {CATEGORY_OPTIONS.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Videos (URLs separados por coma)</label>
        <input
          name="videos"
          type="text"
          defaultValue={(editingItem?.videos || []).join(', ')}
          className="w-full border rounded px-3 py-2"
          placeholder="https://youtu.be/xyz, https://youtube.com/watch?v=abc"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {editingItem ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};