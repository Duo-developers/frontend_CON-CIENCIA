import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AppRoutes } from './routes'
import AuthProvider from './shared/context/AuthProvider'
import { Toaster } from 'react-hot-toast'

// App.jsx - Aplicación principal de CON-CIENCIA
export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-light-bg font-inter">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        
        {/* Configuración global de react-hot-toast */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Configuración por defecto para todos los toasts
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            // Estilos específicos por tipo
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10B981',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#EF4444',
              },
            },
            loading: {
              style: {
                background: '#3B82F6',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  )
}
