import { useState } from 'react';

export const usePasswordForm = (changePassword, clearMessages) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const hasValidPasswordData = () => {
    return (
      passwordData.currentPassword.trim() !== '' &&
      passwordData.newPassword.trim() !== '' &&
      passwordData.confirmPassword.trim() !== '' &&
      passwordData.newPassword === passwordData.confirmPassword
    );
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return { success: false };
    }
    
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    
    return result;
  };

  return {
    passwordData,
    showCurrentPassword,
    showNewPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    handlePasswordChange,
    handlePasswordSubmit,
    hasValidPasswordData
  };
};