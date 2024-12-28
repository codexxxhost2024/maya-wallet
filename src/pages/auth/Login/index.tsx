import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { getDeviceInfo } from '../../../lib/device';
import AuthLayout from '../../../components/auth/AuthLayout';
import LoginForm from './LoginForm';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (phone: string) => {
    setLoading(true);
    setError('');

    try {
      // Check if user exists
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('phone', phone)
        .single();

      if (userError) throw new Error('User not found');

      // Store phone for PIN verification
      sessionStorage.setItem('signin_phone', phone);

      // Store device info
      const deviceInfo = getDeviceInfo();
      await supabase.from('user_devices').insert({
        user_id: user.id,
        ...deviceInfo
      });

      // Redirect to PIN screen
      navigate('/pin');
    } catch (err: any) {
      setError('Invalid phone number');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  );
}