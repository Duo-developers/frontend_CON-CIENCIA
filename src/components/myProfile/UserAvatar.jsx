import React from 'react';

export const UserAvatar = ({ user, previewImage, size = 'large' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-primary-blue shadow-md`}>
      {previewImage ? (
        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
      ) : user && user.perfil ? (
        <img src={user.perfil} alt={user.username || 'Usuario'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-2xl text-primary-blue">
          {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
        </span>
      )}
    </div>
  );
};