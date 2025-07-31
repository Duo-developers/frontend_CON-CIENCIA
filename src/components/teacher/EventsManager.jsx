import React from 'react';
import { useEvents } from '../../shared/hooks/useEvents';
import { useTeacherModal } from '../../shared/hooks/useTeacherModal';
import { useTeacherForm } from '../../shared/hooks/useTeacherForm';
import { ContentTable } from './ContentTable';
import { TeacherModal } from './TeacherModal';
import toast from 'react-hot-toast';

export const EventsManager = () => {
  const modalProps = useTeacherModal();
  const {
    formatEventData,
    CATEGORY_OPTIONS_EVENT
  } = useTeacherForm();

  const {
    events,
    loading: loadingEvents,
    create: createEvent,
    update: updateEvent,
    remove: deleteEvent,
  } = useEvents();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const data = formatEventData(form, modalProps.eventLinks);
    console.log('Enviando evento:', data);

    try {
      if (modalProps.editingItem) {
        await updateEvent(modalProps.editingItem.eid, data);
        toast.success('Evento actualizado exitosamente');
      } else {
        await createEvent(data);
        toast.success('Evento creado exitosamente');
      }
      modalProps.closeModal();
    } catch (error) {
      console.error('Error al guardar evento:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Error al guardar el evento');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    await deleteEvent(id);
  };

  return (
    <>
      <ContentTable
        activeTab="events"
        items={events}
        loadingArticles={false}
        loadingEvents={loadingEvents}
        onEdit={modalProps.openEditModal}
        onDelete={handleDelete}
        onCreateClick={modalProps.openCreateModal}
      />

      <TeacherModal
        isOpen={modalProps.modalOpen}
        onClose={modalProps.closeModal}
        onSubmit={handleSubmit}
        activeTab="events"
        editingItem={modalProps.editingItem}
        categoryOptions={CATEGORY_OPTIONS_EVENT}
        eventLinks={modalProps.eventLinks}
        onLinkChange={modalProps.handleLinkChange}
        onAddLink={modalProps.addLinkField}
        onRemoveLink={modalProps.removeLinkField}
      />
    </>
  );
};
