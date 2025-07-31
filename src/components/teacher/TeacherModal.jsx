import React from 'react';
import { ArticleForm } from './ArticleForm';
import { EventForm } from './EventForm';

export const TeacherModal = ({
  isOpen,
  onClose,
  onSubmit,
  activeTab,
  editingItem,
  categoryOptions,
  eventLinks,
  onLinkChange,
  onAddLink,
  onRemoveLink
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingItem ? 'Editar' : 'Crear'} {activeTab === 'articles' ? 'Artículo' : 'Evento'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {activeTab === 'articles' ? (
            <ArticleForm 
              editingItem={editingItem} 
              categoryOptions={categoryOptions} 
            />
          ) : (
            <EventForm
              editingItem={editingItem}
              categoryOptions={categoryOptions}
              eventLinks={eventLinks}
              onLinkChange={onLinkChange}
              onAddLink={onAddLink}
              onRemoveLink={onRemoveLink}
            />
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingItem ? 'Guardar Cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
