import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginPage } from './pages/Auth'
import BlogPage from './pages/BlogPage'
import EventosPage from './pages/EventosPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import { RegisterPage } from './pages/Auth'
import { TeacherStudio } from './pages/Teacher-Role/TeacherStudio'
import { AdminStudio } from './pages/AdminStudio'
import { MyAccountPage } from './pages/AccountPage/MyAccountPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/Auth/ResetPasswordPage';
import ArticleDetailPage from './pages/ArticleDetailPage' 


export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path='/blog' element={<BlogPage />}/>
      <Route path='/eventos' element={<EventosPage />}/>
      <Route path='/sobre-nosotros' element={<SobreNosotrosPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Nueva ruta dinámica para ver artículo con comentarios */}
      <Route path='/article/:id' element={<ArticleDetailPage />} />
      
      {/* Rutas Protegidas */}
      <Route path='/mi-cuenta' element={
        <ProtectedRoute requiredRoles={["USER_ROLE", "TEACHER_ROLE", "ADMIN_ROLE"]}>
          <MyAccountPage />
        </ProtectedRoute>
      }/>
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
  )
}