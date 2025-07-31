import { useState, useEffect } from 'react';

export const useProfileForm = (user, updateProfile, clearMessages) => {
  const [originalProfileData, setOriginalProfileData] = useState({
    name: '',
    email: '',
    username: ''
  });
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        username: user.username || ''
      };
      
      setProfileData(userData);
      setOriginalProfileData(userData);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const hasProfileChanges = () => {
    return (
      profileData.name !== originalProfileData.name ||
      profileData.email !== originalProfileData.email ||
      profileData.username !== originalProfileData.username
    );
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    const result = await updateProfile(profileData);
    if (result.success) {
      setOriginalProfileData({
        name: result.user.name || '',
        email: result.user.email || '',
        username: result.user.username || ''
      });
      
      setProfileData({
        name: result.user.name || '',
        email: result.user.email || '',
        username: result.user.username || ''
      });
    }
    
    return result;
  };

  return {
    profileData,
    handleProfileChange,
    handleProfileSubmit,
    hasProfileChanges
  };
};