import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/context/useAuth'; 

export function ProtectedRoute({ children, requiredRoles = [] }) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { isLoggedIn, userRole: user?.role, isLoading });
    
    const userDetails = localStorage.getItem('usuario');
    console.log("localStorage 'usuario':", userDetails ? "Existe" : "No existe");
    
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        console.log("Token present:", !!parsed.token);
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }
  }, [isLoggedIn, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-700">Verificando sesión...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    console.log("Usuario no autenticado, redirigiendo a /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && (!user?.role || !requiredRoles.includes(user.role))) {
    console.log(`Rol requerido no coincide. Usuario: ${user?.role}, Requerido: ${requiredRoles.join(', ')}`);
    return <Navigate to="/" replace />;
  }

  console.log("Autenticación exitosa, mostrando componente protegido");
  return children;
}
