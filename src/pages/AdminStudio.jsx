import React, { useState } from 'react';
import { useArticles } from '../shared/hooks/useTeacherStudie';
import { useEvents } from '../shared/hooks/useEvents';
import { useUsers } from '../shared/hooks/useUsersAdmin';
import toast from 'react-hot-toast';

const CATEGORY_OPTIONS_ARTICLE = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy',
  'Physics', 'Mathematics', 'Technology',
  'Geology and Earth Sciences', 'Social Sciences', 'Engineering', 'Other'
];

const CATEGORY_OPTIONS_EVENT = [
  'Biology', 'Chemistry', 'History', 'Medicine', 'Astronomy'
];

const ROLES = ['USER_ROLE', 'TEACHER_ROLE', 'ADMIN_ROLE'];

export function AdminStudio() {
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

  const {
    users,
    loading: loadingUsers,
    changeUserRole,
    removeUser,
  } = useUsers();

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

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    try {
      if (activeTab === 'articles') {
        await deleteArticle(id);
        toast.success('Artículo eliminado');
      } else if (activeTab === 'events') {
        await deleteEvent(id);
        toast.success('Evento eliminado');
      }
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const handleDeleteUser = async (uid) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await removeUser(uid);
      toast.success('Usuario eliminado correctamente');
    } catch {
      toast.error('Error al eliminar usuario');
    }
  };

  const handleRoleChange = async (uid, newRole) => {
    try {
      await changeUserRole(uid, newRole);
      toast.success('Rol actualizado correctamente');
    } catch {
      toast.error('Error al actualizar el rol');
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (activeTab === 'articles') {
      const title = form.title.value.trim();
      const content = form.content.value.trim();
      const category = form.category.value;

      if (!title) {
        toast.error('El título es obligatorio');
        return;
      }
      if (!content) {
        toast.error('El contenido es obligatorio');
        return;
      }
      if (!CATEGORY_OPTIONS_ARTICLE.includes(category)) {
        toast.error('Categoría no válida');
        return;
      }

      const videoInput = form.videos?.value.trim();
      const videoArray = videoInput
        ? videoInput
            .split(',')
            .map(v => v.trim())
            .map(v => {
              try {
                const url = new URL(v);
                if (url.hostname === 'youtu.be') {
                  const id = url.pathname.slice(1);
                  return `https://www.youtube.com/watch?v=${id}`;
                }
                if (url.hostname.includes('youtube.com')) {
                  const vid = url.searchParams.get('v');
                  return vid ? `https://www.youtube.com/watch?v=${vid}` : '';
                }
                return v;
              } catch {
                return '';
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

      try {
        if (editingItem) {
          if (!editingItem.aid) {
            toast.error('Error interno: ID de artículo inválido');
            return;
          }
          await updateArticle(editingItem.aid, data);
          toast.success('Artículo actualizado exitosamente');
        } else {
          await createArticle(data);
          toast.success('Artículo creado exitosamente');
        }
        setModalOpen(false);
        setEditingItem(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al guardar el artículo');
      }
    } else if (activeTab === 'events') {
      const data = {
        name: form.name.value.trim(),
        date: form.date.value,
        location: form.location.value.trim(),
        description: form.description.value.trim(),
        category: form.category.value,
        status: true,
        externalLinks: eventLinks.filter(link => link.title && link.url),
      };

      try {
        if (editingItem) {
          await updateEvent(editingItem.eid, data);
          toast.success('Evento actualizado exitosamente');
        } else {
          await createEvent(data);
          toast.success('Evento creado exitosamente');
        }
        setModalOpen(false);
        setEditingItem(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al guardar el evento');
      }
    }
  };

  const renderTableBody = () => {
    if (activeTab === 'articles') {
      if (articles.length === 0) {
        return (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-500">
              No hay artículos registrados aún.
            </td>
          </tr>
        );
      }
      return articles.map(item => (
        <tr key={item.aid}>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.title}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.status ? 'Publicado' : 'Borrador'}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
            <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-900">Editar</button>
            <button onClick={() => handleDelete(item.aid)} className="text-red-600 hover:text-red-900">Eliminar</button>
          </td>
        </tr>
      ));
    }
    if (activeTab === 'events') {
      if (events.length === 0) {
        return (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-500">
              No hay eventos registrados aún.
            </td>
          </tr>
        );
      }
      return events.map(item => (
        <tr key={item.eid}>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(item.date).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.location}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
            <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-900">Editar</button>
            <button onClick={() => handleDelete(item.eid)} className="text-red-600 hover:text-red-900">Eliminar</button>
          </td>
        </tr>
      ));
    }
    if (activeTab === 'users') {
      if (users.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="text-center py-6 text-gray-500">
              No hay usuarios registrados.
            </td>
          </tr>
        );
      }
      return users.map(user => (
        <tr key={user.uid}>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.username}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            {user.role === 'ADMIN_ROLE' ? (
              <span className="font-semibold text-gray-700">{user.role}</span>
            ) : (
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                className="border rounded p-1"
              >
                {['USER_ROLE', 'TEACHER_ROLE'].map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
            <button onClick={() => handleDeleteUser(user.uid)} className="text-red-600 hover:text-red-900">Eliminar</button>
          </td>
        </tr>
      ));
    }
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
              activeTab === 'articles' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
            }`}
          >
            Artículos
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'events' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
            }`}
          >
            Eventos
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'users' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
            }`}
          >
            Usuarios
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab === 'articles' ? 'Gestión de Artículos' :
             activeTab === 'events' ? 'Gestión de Eventos' :
             'Gestión de Usuarios'}
          </h2>
          {(activeTab === 'articles' || activeTab === 'events') && (
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Nuevo {activeTab === 'articles' ? 'Artículo' : 'Evento'}
            </button>
          )}
        </div>

        {(loadingArticles && activeTab === 'articles') && <p>Cargando artículos...</p>}
        {(loadingEvents && activeTab === 'events') && <p>Cargando eventos...</p>}
        {(loadingUsers && activeTab === 'users') && <p>Cargando usuarios...</p>}

        {!loadingArticles && !loadingEvents && !loadingUsers && (
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
                ) : activeTab === 'events' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lugar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3">Acciones</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cambiar Rol</th>
                    <th className="px-6 py-3">Acciones</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>
        )}

        {modalOpen && (activeTab === 'articles' || activeTab === 'events') && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingItem ? 'Editar' : 'Crear'} {activeTab === 'articles' ? 'Artículo' : 'Evento'}
                </h3>
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'articles' && (
                  <>
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
                        defaultValue={editingItem?.category || CATEGORY_OPTIONS_ARTICLE[0]}
                        className="w-full border rounded px-3 py-2"
                        required
                      >
                        {CATEGORY_OPTIONS_ARTICLE.map(cat => (
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
                  </>
                )}

                {activeTab === 'events' && (
                  <>
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
                        defaultValue={editingItem?.category || CATEGORY_OPTIONS_EVENT[0]}
                        className="w-full border rounded px-3 py-2"
                        required
                      >
                        {CATEGORY_OPTIONS_EVENT.map(cat => (
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
                            onChange={e => handleLinkChange(i, 'title', e.target.value)}
                            className="flex-1 border rounded px-3 py-2"
                          />
                          <input
                            type="url"
                            placeholder="URL"
                            value={link.url}
                            onChange={e => handleLinkChange(i, 'url', e.target.value)}
                            className="flex-1 border rounded px-3 py-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeLinkField(i)}
                            className="text-red-600 hover:text-red-900 px-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addLinkField}
                        className="text-blue-600 hover:text-blue-900 font-semibold"
                      >
                        + Añadir enlace
                      </button>
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4 pt-4 border-t mt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}