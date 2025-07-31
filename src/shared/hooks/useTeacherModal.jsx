import { useState } from 'react';

export const useTeacherModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [eventLinks, setEventLinks] = useState([{ title: '', url: '' }]);

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
    setEventLinks([{ title: '', url: '' }]);
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

  return {
    modalOpen,
    editingItem,
    eventLinks,
    openCreateModal,
    openEditModal,
    closeModal,
    handleLinkChange,
    addLinkField,
    removeLinkField
  };
};
