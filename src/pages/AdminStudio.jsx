import React from 'react';

export function AdminStudio() {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">CON-CIENCIA Studio - Modo Administrador</h1>
            <p className="opacity-90">Panel de administración con acceso completo a la plataforma</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Gestión de Usuarios</h2>
                <p className="text-medium-text mb-4">Administra todos los usuarios de la plataforma: profesores, estudiantes y administradores.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Gestionar Usuarios
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Contenido Educativo</h2>
                <p className="text-medium-text mb-4">Supervisa y aprueba contenido educativo creado por profesores.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Revisar Contenido
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Analítica</h2>
                <p className="text-medium-text mb-4">Revisa estadísticas y métricas de uso de la plataforma.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Ver Analítica
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Configuración</h2>
                <p className="text-medium-text mb-4">Ajusta parámetros globales de la plataforma.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Configurar Sistema
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 col-span-1 md:col-span-2">
                <h2 className="text-xl font-semibold text-dark-text mb-4">Panel de Control</h2>
                <p className="text-medium-text mb-4">Acceso a todas las funcionalidades avanzadas del sistema.</p>
                <div className="flex justify-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold">
                    Acceder al Panel de Control
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
