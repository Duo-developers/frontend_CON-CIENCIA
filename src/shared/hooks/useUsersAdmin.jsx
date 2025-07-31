import { useState, useEffect } from 'react';
import {
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../../services/api';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeUserRole = async (uid, role) => {
    try {
      const res = await updateUserRole(uid, role);
      if (res.data.success) {
        setUsers(users.map(u => (u.uid === uid ? { ...u, role } : u)));
      }
      return res;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const removeUser = async (uid) => {
    try {
      const res = await deleteUser(uid);
      if (res.data.success) {
        setUsers(users.filter(u => u.uid !== uid));
      }
      return res;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    changeUserRole,
    removeUser,
  };
}