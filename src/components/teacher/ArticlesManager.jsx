import React from 'react';
import { useArticles } from '../../shared/hooks/useTeacherStudie';
import { useTeacherModal } from '../../shared/hooks/useTeacherModal';
import { useTeacherForm } from '../../shared/hooks/useTeacherForm';
import { ContentTable } from './ContentTable';
import { TeacherModal } from './TeacherModal';
import toast from 'react-hot-toast';

export const ArticlesManager = () => {
  const modalProps = useTeacherModal();
  const {
    validateArticleForm,
    formatArticleData,
    CATEGORY_OPTIONS_ARTICLE
  } = useTeacherForm();

  const {
    articles,
    loading: loadingArticles,
    create: createArticle,
    update: updateArticle,
    remove: deleteArticle,
  } = useArticles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    if (!validateArticleForm(form)) return;
    
    const data = formatArticleData(form);
    console.log('Enviando artículo:', data);

    try {
      if (modalProps.editingItem) {
        if (!modalProps.editingItem.aid) {
          toast.error('Error interno: ID de artículo inválido');
          return;
        }
        await updateArticle(modalProps.editingItem.aid, data);
        toast.success('Artículo actualizado exitosamente');
      } else {
        await createArticle(data);
        toast.success('Artículo creado exitosamente');
      }
      modalProps.closeModal();
    } catch (error) {
      console.error('Error al guardar artículo:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Error al guardar el artículo');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    await deleteArticle(id);
  };

  return (
    <>
      <ContentTable
        activeTab="articles"
        items={articles}
        loadingArticles={loadingArticles}
        loadingEvents={false}
        onEdit={modalProps.openEditModal}
        onDelete={handleDelete}
        onCreateClick={modalProps.openCreateModal}
      />

      <TeacherModal
        isOpen={modalProps.modalOpen}
        onClose={modalProps.closeModal}
        onSubmit={handleSubmit}
        activeTab="articles"
        editingItem={modalProps.editingItem}
        categoryOptions={CATEGORY_OPTIONS_ARTICLE}
        eventLinks={modalProps.eventLinks}
        onLinkChange={modalProps.handleLinkChange}
        onAddLink={modalProps.addLinkField}
        onRemoveLink={modalProps.removeLinkField}
      />
    </>
  );
};
