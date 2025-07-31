import React, { useState } from 'react';

export const TeacherSidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('articles');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <aside className="w-64 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hidden md:flex flex-col">
      <div className="h-16 flex items-center font-semibold text-lg mb-8 border-b border-white/40">
        Panel Teacher
      </div>
      <nav className="flex flex-col space-y-4 flex-grow">
        <button
          onClick={() => handleTabChange('articles')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            activeTab === 'articles'
              ? 'bg-white/30 text-white font-semibold'
              : 'text-white hover:bg-white/20'
          }`}
        >
          Artículos
        </button>
        <button
          onClick={() => handleTabChange('events')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            activeTab === 'events'
              ? 'bg-white/30 text-white font-semibold'
              : 'text-white hover:bg-white/20'
          }`}
        >
          Eventos
        </button>
      </nav>
    </aside>
  );
};
