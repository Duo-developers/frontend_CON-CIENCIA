import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AppRoutes } from './routes'
import AuthProvider from './shared/context/AuthProvider'

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
      </div>
    </AuthProvider>
  )
}
