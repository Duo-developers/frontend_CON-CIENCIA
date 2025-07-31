import React from 'react';

const CATEGORY_OPTIONS = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy'
];

export const EventForm = ({ editingItem, eventLinks, onLinkChange, onAddLink, onRemoveLink, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Nombre</label>
        <input
          name="name"
          type="text"
          defaultValue={editingItem?.name || ''}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Fecha</label>
        <input
          name="date"
          type="date"
          defaultValue={editingItem ? new Date(editingItem.date).toISOString().split('T')[0] : ''}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Lugar</label>
        <input
          name="location"
          type="text"
          defaultValue={editingItem?.location || ''}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={editingItem?.description || ''}
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
        <label className="block font-semibold mb-1">Enlaces Externos</label>
        {eventLinks.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Título"
              value={link.title}
              onChange={e => onLinkChange(i, 'title', e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={e => onLinkChange(i, 'url', e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={() => onRemoveLink(i)}
              className="text-red-600 hover:text-red-900 px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddLink}
          className="text-blue-600 hover:text-blue-900 font-semibold"
        >
          + Añadir enlace
        </button>
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