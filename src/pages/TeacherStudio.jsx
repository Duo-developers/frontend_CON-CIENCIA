import React, { useState } from 'react';
import { useArticles } from '../shared/hooks/useTeacherStudie';
import { useEvents } from '../shared/hooks/useEvents';

const CATEGORY_OPTIONS_ARTICLE = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy',
  'Physics', 'Mathematics', 'Technology',
  'Geology and Earth Sciences', 'Social Sciences', 'Engineering', 'Other'
];

const CATEGORY_OPTIONS_EVENT = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy'
];

export function TeacherStudio() {
  const [activeTab, setActiveTab] = useState('articles');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [eventLinks, setEventLinks] = useState([{ title: '', url: '' }]);

  const {
    articles,
    loading: loadingArticles,
    create: createArticle,
    update: updateArticle,
    remove: deleteArticle,
  } = useArticles();

  const {
    events,
    loading: loadingEvents,
    create: createEvent,
    update: updateEvent,
    remove: deleteEvent,
  } = useEvents();

  const openCreateModal = () => {
    setEditingItem(null);
    setEventLinks([{ title: '', url: '' }]);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    if (item?.externalLinks) {
      setEventLinks(item.externalLinks);
    } else {
      setEventLinks([{ title: '', url: '' }]);
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (activeTab === 'articles') {
      // -----------------------
      // Validaciones y normalización para Artículos
      // -----------------------
      const title = form.title.value.trim();
      const content = form.content.value.trim();
      const category = form.category.value;

      if (!title) {
        return alert('El título es obligatorio');
      }
      if (!content) {
        return alert('El contenido es obligatorio');
      }
      if (!CATEGORY_OPTIONS_ARTICLE.includes(category)) {
        return alert('Categoría no válida');
      }

      // Procesamiento y normalización de URLs de YouTube
      const videoInput = form.videos?.value.trim();
      const videoArray = videoInput
        ? videoInput
            .split(',')
            .map(v => v.trim())
            .map(v => {
              try {
                const url = new URL(v);
                // convierto y limpio query params
                if (url.hostname === 'youtu.be') {
                  const id = url.pathname.slice(1);
                  return `https://www.youtube.com/watch?v=${id}`;
                }
                if (url.hostname.includes('youtube.com')) {
                  const vid = url.searchParams.get('v');
                  return vid ? `https://www.youtube.com/watch?v=${vid}` : '';
                }
                // si no es YouTube, lo devuelvo igual
                return v;
              } catch {
                return ''; // descarto si no es URL válida
              }
            })
            .filter(Boolean)
        : [];

      const data = {
        title,
        content,
        category,
        status: true,
        videos: videoArray,
      };

      console.log('Enviando artículo:', data);

      try {
        if (editingItem) {
          if (!editingItem.aid) {
            return alert('Error interno: ID de artículo inválido');
          }
          await updateArticle(editingItem.aid, data);
        } else {
          await createArticle(data);
        }
        setModalOpen(false);
        setEditingItem(null);
      } catch (error) {
        console.error('Error al guardar artículo:', error.response?.data || error);
        alert(error.response?.data?.message || 'Error al guardar el artículo');
      }
    } else {
      // -----------------------
      // Lógica original de Eventos
      // -----------------------
      const data = {
        name: form.name.value.trim(),
        date: form.date.value,
        location: form.location.value.trim(),
        description: form.description.value.trim(),
        category: form.category.value,
        status: true,
        externalLinks: eventLinks.filter(link => link.title && link.url),
      };

      console.log('Enviando evento:', data);

      try {
        if (editingItem) {
          await updateEvent(editingItem.eid, data);
        } else {
          await createEvent(data);
        }
        setModalOpen(false);
        setEditingItem(null);
      } catch (error) {
        console.error('Error al guardar evento:', error.response?.data || error);
        alert(error.response?.data?.message || 'Error al guardar el evento');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    if (activeTab === 'articles') {
      await deleteArticle(id);
    } else {
      await deleteEvent(id);
    }
  };

  const items = activeTab === 'articles' ? articles : events;

  const handleLinkChange = (index, field, value) => {
    const updated = [...eventLinks];
    updated[index][field] = value;
    setEventLinks(updated);
  };

  const addLinkField = () => {
    setEventLinks([...eventLinks, { title: '', url: '' }]);
  };

  const removeLinkField = (index) => {
    if (eventLinks.length === 1) return;
    const updated = [...eventLinks];
    updated.splice(index, 1);
    setEventLinks(updated);
  };

  return (
    <div className="bg-surface font-inter min-h-screen flex p-6 gap-6">
      <aside className="w-64 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hidden md:flex flex-col">
        <div className="h-16 flex items-center font-semibold text-lg mb-8 border-b border-white/40">
          Panel Teacher
        </div>
        <nav className="flex flex-col space-y-4 flex-grow">
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'articles'
                ? 'bg-white/30 text-white font-semibold'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Artículos
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'events'
                ? 'bg-white/30 text-white font-semibold'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Eventos
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'articles' ? 'Gestión de Artículos' : 'Gestión de Eventos'}
          </h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Nuevo {activeTab === 'articles' ? 'Artículo' : 'Evento'}
          </button>
        </div>

        {loadingArticles && activeTab === 'articles' && <p>Cargando artículos...</p>}
        {loadingEvents && activeTab === 'events' && <p>Cargando eventos...</p>}

        {!loadingArticles && !loadingEvents && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === 'articles' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3">Acciones</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lugar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
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
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(activeTab === 'articles' ? item.aid : item.eid)
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingItem ? 'Editar' : 'Crear'} {activeTab === 'articles' ? 'Artículo' : 'Evento'}
                </h3>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  X
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'articles' ? (
                  <>
                    <input
                      name="title"
                      defaultValue={editingItem?.title || ''}
                      placeholder="Título"
                      className="w-full border p-2"
                      required
                    />
                    <textarea
                      name="content"
                      defaultValue={editingItem?.content || ''}
                      placeholder="Contenido"
                      className="w-full border p-2"
                      rows={6}
                      required
                    />
                    <input
                      name="videos"
                      defaultValue={editingItem?.videos?.join(', ') || ''}
                      placeholder="URLs de videos (separadas por coma)"
                      className="w-full border p-2"
                    />
                    <select
                      name="category"
                      defaultValue={editingItem?.category || CATEGORY_OPTIONS_ARTICLE[0]}
                      className="w-full border p-2"
                      required
                    >
                      {CATEGORY_OPTIONS_ARTICLE.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    {/* Aquí va todo el form de eventos sin cambios */}
                    <input
                      name="name"
                      defaultValue={editingItem?.name || ''}
                      placeholder="Nombre del Evento"
                      className="w-full border p-2"
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
                      className="w-full border p-2"
                      required
                    />
                    <input
                      name="location"
                      defaultValue={editingItem?.location || ''}
                      placeholder="Lugar"
                      className="w-full border p-2"
                      required
                    />
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description || ''}
                      placeholder="Descripción"
                      className="w-full border p-2"
                      rows={4}
                      required
                    />
                    <select
                      name="category"
                      defaultValue={editingItem?.category || CATEGORY_OPTIONS_EVENT[0]}
                      className="w-full border p-2"
                      required
                    >
                      {CATEGORY_OPTIONS_EVENT.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <div className="space-y-2">
                      <label className="font-medium">Enlaces externos</label>
                      {eventLinks.map((link, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Título"
                            value={link.title}
                            onChange={e => handleLinkChange(idx, 'title', e.target.value)}
                            className="flex-1 border p-2"
                          />
                          <input
                            type="url"
                            placeholder="URL"
                            value={link.url}
                            onChange={e => handleLinkChange(idx, 'url', e.target.value)}
                            className="flex-1 border p-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeLinkField(idx)}
                            className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                          >
                            –
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addLinkField}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                      >
                        + Añadir enlace
                      </button>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {editingItem ? 'Guardar Cambios' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}