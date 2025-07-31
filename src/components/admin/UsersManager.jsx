import React from 'react';
import { useUsers } from '../../shared/hooks/useUsersAdmin';
import toast from 'react-hot-toast';
import { AdminMainSection, UsersTable } from './';

export const UsersManager = () => {
  // El hook se consume DIRECTAMENTE en el componente
  const {
    users,
    loading: loadingUsers,
    changeUserRole,
    removeUser,
  } = useUsers();

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

  return (
    <AdminMainSection
      title="Gestión de Usuarios"
      loading={loadingUsers}
      showAddButton={false}
    >
      <UsersTable
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDeleteUser}
      />
    </AdminMainSection>
  );
};