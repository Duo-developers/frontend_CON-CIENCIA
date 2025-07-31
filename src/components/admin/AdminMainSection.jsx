import React from 'react';

export const AdminMainSection = ({ title, loading, showAddButton, addButtonLabel, onAddClick, children }) => {
  return (
    <main className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {addButtonLabel}
          </button>
        )}
      </div>
      
      {loading ? (
        <p className="text-center py-4 text-gray-500">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {children}
          </table>
        </div>
      )}
    </main>
  );
};