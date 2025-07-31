import React, { useState } from 'react';
import { useArticles } from '../../shared/hooks/useTeacherStudie';
import toast from 'react-hot-toast';
import { AdminMainSection, ArticlesTable, ArticleForm, ModalContainer } from './';

export const ArticlesManager = () => {
  // Estados locales del componente
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // El hook se consume DIRECTAMENTE en el componente
  const {
    articles,
    loading: loadingArticles,
    create: createArticle,
    update: updateArticle,
    remove: deleteArticle,
  } = useArticles();

  const openCreateModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    try {
      await deleteArticle(id);
      toast.success('Artículo eliminado');
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
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
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar el artículo');
    }
  };

  return (
    <>
      <AdminMainSection
        title="Gestión de Artículos"
        loading={loadingArticles}
        showAddButton={true}
        addButtonLabel="Nuevo Artículo"
        onAddClick={openCreateModal}
      >
        <ArticlesTable
          articles={articles}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </AdminMainSection>

      <ModalContainer
        isOpen={modalOpen}
        title={`${editingItem ? 'Editar' : 'Crear'} Artículo`}
        onClose={closeModal}
      >
        <ArticleForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </ModalContainer>
    </>
  );
};