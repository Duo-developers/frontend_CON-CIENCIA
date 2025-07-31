import React from 'react';

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-2xl shadow-lg p-6 hidden md:flex flex-col">
      <div className="h-16 flex items-center font-semibold text-lg mb-8 border-b border-white/40">
        Panel Administrador
      </div>
      <nav className="flex flex-col space-y-4 flex-grow">
        <button
          onClick={() => setActiveTab('articles')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            activeTab === 'articles' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
          }`}
        >
          Artículos
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            activeTab === 'events' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
          }`}
        >
          Eventos
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
            activeTab === 'users' ? 'bg-white/30 text-white font-semibold' : 'text-white hover:bg-white/20'
          }`}
        >
          Usuarios
        </button>
      </nav>
    </aside>
  );
};