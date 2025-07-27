import React from 'react';

export function TeacherStudio() {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">CON-CIENCIA Studio - Modo Profesor</h1>
            <p className="opacity-90">Panel de control para profesores donde puedes gestionar tus clases, recursos y estudiantes</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Mis Clases</h2>
                <p className="text-medium-text mb-4">Administra tus clases y materiales educativos.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                  Gestionar Clases
                </button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Mis Estudiantes</h2>
                <p className="text-medium-text mb-4">Revisa el progreso de tus estudiantes y comunícate con ellos.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                  Ver Estudiantes
                </button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Recursos Didácticos</h2>
                <p className="text-medium-text mb-4">Accede a la biblioteca de recursos educativos.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                  Explorar Recursos
                </button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Calendario</h2>
                <p className="text-medium-text mb-4">Organiza tu agenda y programa clases.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                  Ver Calendario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
