import React from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <ForgotPasswordForm />
    </div>
  );
}