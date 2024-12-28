import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { getDeviceInfo } from '../../lib/device';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import SubmitButton from '../../components/auth/SubmitButton';
import AuthFooter from '../../components/auth/AuthFooter';

export default function Login() {
  const [phone, setPhone] = useState('09056741316'); // Pre-filled for demo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Phone Number"
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          error={error}
        />
        <SubmitButton
          loading={loading}
          loadingText="Verifying..."
          text="Continue"
        />
        <AuthFooter mode="signin" />
      </form>
    </AuthLayout>
  );
}