import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './components/ProtectedRoute'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })))
const LoginPage = lazy(() => import('./pages/Auth').then(module => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('./pages/Auth').then(module => ({ default: module.RegisterPage })))
const TeacherStudio = lazy(() => import('./pages/TeacherStudio').then(module => ({ default: module.TeacherStudio })))
const AdminStudio = lazy(() => import('./pages/AdminStudio').then(module => ({ default: module.AdminStudio })))

// Lazy load component pages
const BlogPage = lazy(() => import('./components/homeBlog/Homeblog'))
const EventosPage = lazy(() => import('./components/homeEvent/homeEvent'))
const SobreNosotros = lazy(() => import('./components/homeNosotros/homeNosotros'))

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
  </div>
)

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path='/blog' element={<BlogPage />}/>
        <Route path='/eventos' element={<EventosPage />}/>
        <Route path='/sobre-nosotros' element={<SobreNosotros />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        
        {/* Rutas Protegidas */}
        <Route path='/teacher-studio' element={
          <ProtectedRoute requiredRoles={["TEACHER_ROLE"]}>
            <TeacherStudio />
          </ProtectedRoute>
        }/>
        <Route path='/admin-studio' element={
          <ProtectedRoute requiredRoles={["ADMIN_ROLE"]}>
            <AdminStudio />
          </ProtectedRoute>
        }/>
        <Route path="*" element={
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-dark-text mb-4">404</h1>
            <p className="text-medium-text">Página no encontrada</p>
          </div>
        } />
      </Routes>
    </Suspense>
  )
}