import React, { useState } from 'react';
import { 
  AdminSidebar, 
  ArticlesManager,
  EventsManager,
  UsersManager
} from '../components/admin';

export function AdminStudio() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <div className="bg-surface font-inter min-h-screen flex p-6 gap-6">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {activeTab === 'articles' && <ArticlesManager />}
        {activeTab === 'events' && <EventsManager />}
        {activeTab === 'users' && <UsersManager />}
      </main>
    </div>
  );
}