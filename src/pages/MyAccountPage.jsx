import { useState, useRef, useEffect } from 'react';
import { useUserAccount } from '../shared/hooks/useUserAccount';

export function MyAccountPage() {
  const { 
    user, 
    loading, 
    error, 
    success, 
    updateProfile, 
    changePassword, 
    updateProfilePicture, 
    clearMessages 
  } = useUserAccount();

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Actualizar los datos del formulario cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    const result = await updateProfile(profileData);
    if (result.success) {
      // Mantener los datos actualizados en el formulario
      setProfileData({
        name: result.user.name || '',
        email: result.user.email || '',
        username: result.user.username || ''
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
    
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (!profileImage) return;
    
    const result = await updateProfilePicture(profileImage);
    if (result.success) {
      setProfileImage(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const UserAvatar = ({ size = 'large' }) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <UserAvatar size="large" />
            <div>
              <h1 className="text-3xl font-bold text-dark-text">Mi Cuenta</h1>
              <p className="text-medium-text">@{user?.username || 'usuario'}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mt-2">
                {user?.role === 'ADMIN_ROLE' ? 'Administrador' : 
                 user?.role === 'TEACHER_ROLE' ? 'Profesor' : 'Usuario'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Información Personal
                </div>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Seguridad
                </div>
              </button>
              <button
                onClick={() => setActiveTab('avatar')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'avatar'
                    ? 'border-primary-blue text-primary-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Foto de Perfil
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Mensajes de estado */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {success}
              </div>
            )}

            {/* Tab: Información Personal */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Actualizando...' : 'Actualizar Información'}
                </button>
              </form>
            )}

            {/* Tab: Seguridad */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    required
                  />
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || passwordData.newPassword !== passwordData.confirmPassword}
                  className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </button>
              </form>
            )}

            {/* Tab: Foto de Perfil */}
            {activeTab === 'avatar' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <UserAvatar size="large" />
                  <p className="text-sm text-gray-500 mt-2">Foto de perfil actual</p>
                </div>

                <form onSubmit={handleImageSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar nueva foto
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
                    </p>
                  </div>

                  {previewImage && (
                    <div className="flex flex-col items-center">
                      <UserAvatar size="large" />
                      <p className="text-sm text-gray-500 mt-2">Vista previa</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !profileImage}
                    className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loading ? 'Subiendo...' : 'Actualizar Foto de Perfil'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
