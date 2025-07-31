import React from 'react';

export const EventForm = ({ 
  editingItem, 
  categoryOptions, 
  eventLinks, 
  onLinkChange, 
  onAddLink, 
  onRemoveLink 
}) => {
  return (
    <>
      <input
        name="name"
        defaultValue={editingItem?.name || ''}
        placeholder="Nombre del Evento"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        name="date"
        defaultValue={
          editingItem?.date
            ? new Date(editingItem.date).toISOString().split('T')[0]
            : ''
        }
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="location"
        defaultValue={editingItem?.location || ''}
        placeholder="Lugar"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        name="description"
        defaultValue={editingItem?.description || ''}
        placeholder="Descripción"
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
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

      <div className="space-y-2">
        <label className="font-medium text-gray-700">Enlaces externos</label>
        {eventLinks.map((link, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              placeholder="Título"
              value={link.title}
              onChange={e => onLinkChange(idx, 'title', e.target.value)}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={e => onLinkChange(idx, 'url', e.target.value)}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => onRemoveLink(idx)}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              –
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddLink}
          className="mt-2 text-sm text-blue-600 hover:underline font-medium"
        >
          + Añadir enlace
        </button>
      </div>
    </>
  );
};
