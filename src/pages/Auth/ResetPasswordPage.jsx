import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

export function ResetPasswordPage() {
  const { token } = useParams();
  
  if (!token) {
    return <Navigate to="/error" replace />;
  }
  
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <ResetPasswordForm token={token} />
    </div>
  );
}