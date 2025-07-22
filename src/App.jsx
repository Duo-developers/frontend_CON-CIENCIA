import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { AppRoutes } from './routes'

// App.jsx - Aplicación principal de CON-CIENCIA
export function App() {
  return (
    <div className="min-h-screen bg-light-bg font-inter">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
