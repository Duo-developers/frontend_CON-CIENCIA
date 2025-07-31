import React, { useState } from 'react';
import { TeacherSidebar, ArticlesManager, EventsManager } from '../../components/teacher';

export function TeacherStudio() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <div className="bg-surface font-inter min-h-screen flex p-6 gap-6">
      <TeacherSidebar onTabChange={setActiveTab} />

      <main className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-gray-900">
        {activeTab === 'articles' ? <ArticlesManager /> : <EventsManager />}
      </main>
    </div>
  );
}