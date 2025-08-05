import { useState } from 'react';
import { useUserAccount } from '../../shared/hooks/useUserAccount';

import { UserAvatar } from '../../components/myProfile/UserAvatar';
import { TabNavigation } from '../../components/myProfile/TabNavigation';
import { ProfileForm } from '../../components/myProfile/ProfileForm';
import { PasswordForm } from '../../components/myProfile/PasswordForm';
import { ImageUploader } from '../../components/myProfile/ImageUploader';

export function MyAccountPage() {
  const { user, setUser, error, success } = useUserAccount();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <UserAvatar user={user} size="large" />
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
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

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

            {/* Tab: Información Personal - PASANDO LAS PROPS NECESARIAS */}
            {activeTab === 'profile' && <ProfileForm user={user} setUser={setUser} />}

            {/* Tab: Seguridad - PASANDO LAS PROPS NECESARIAS */}
            {activeTab === 'security' && <PasswordForm user={user} />}

            {/* Tab: Foto de Perfil - PASANDO LAS PROPS NECESARIAS */}
            {activeTab === 'avatar' && <ImageUploader user={user} setUser={setUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}
