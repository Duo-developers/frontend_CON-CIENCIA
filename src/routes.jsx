import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ruta 404 */}
      <Route path="*" element={
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-dark-text mb-4">404</h1>
          <p className="text-medium-text">Página no encontrada</p>
        </div>
      } />
    </Routes>
  )
}