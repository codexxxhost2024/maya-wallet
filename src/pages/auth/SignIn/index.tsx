import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import AuthLayout from '../../../components/auth/AuthLayout';
import PhoneSignInForm from './PhoneSignInForm';
import AuthFooter from '../../../components/auth/AuthFooter';

export default function SignIn() {
  // ... existing code ...

  return (
    <AuthLayout title="Sign in to your account">
      <div className="space-y-6">
        <PhoneSignInForm
          onSubmit={handlePhoneSubmit}
          loading={loading}
          error={error}
        />
        <AuthFooter mode="signin" />
      </div>
    </AuthLayout>
  );
}