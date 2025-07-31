import React from 'react';

export const UsersTable = ({ users, onRoleChange, onDelete }) => {
  if (users.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="text-center py-6 text-gray-500">
          No hay usuarios registrados.
        </td>
      </tr>
    );
  }

  return (
    <>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cambiar Rol</th>
          <th className="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.uid} className="hover:bg-gray-50">
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
                  onChange={(e) => onRoleChange(user.uid, e.target.value)}
                  className="border rounded p-1"
                >
                  {['USER_ROLE', 'TEACHER_ROLE'].map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
              <button onClick={() => onDelete(user.uid)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};