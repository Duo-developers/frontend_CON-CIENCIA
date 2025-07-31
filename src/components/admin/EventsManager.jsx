import React, { useState } from 'react';
import { useEvents } from '../../shared/hooks/useEvents';
import toast from 'react-hot-toast';
import { AdminMainSection, EventsTable, EventForm, ModalContainer } from './';

export const EventsManager = () => {
  // Estados locales del componente
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [eventLinks, setEventLinks] = useState([{ title: '', url: '' }]);
  
  // El hook se consume DIRECTAMENTE en el componente
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

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar?')) return;
    try {
      await deleteEvent(id);
      toast.success('Evento eliminado');
    } catch (error) {
      toast.error('Error al eliminar');
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
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar el evento');
    }
  };

  return (
    <>
      <AdminMainSection
        title="Gestión de Eventos"
        loading={loadingEvents}
        showAddButton={true}
        addButtonLabel="Nuevo Evento"
        onAddClick={openCreateModal}
      >
        <EventsTable
          events={events}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </AdminMainSection>

      <ModalContainer
        isOpen={modalOpen}
        title={`${editingItem ? 'Editar' : 'Crear'} Evento`}
        onClose={closeModal}
      >
        <EventForm
          editingItem={editingItem}
          eventLinks={eventLinks}
          onLinkChange={handleLinkChange}
          onAddLink={addLinkField}
          onRemoveLink={removeLinkField}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </ModalContainer>
    </>
  );
};