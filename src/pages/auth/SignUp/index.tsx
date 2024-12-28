import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { getDeviceInfo } from '../../../lib/device';
import AuthLayout from '../../../components/auth/AuthLayout';
import SignUpForm from './SignUpForm';
import AuthFooter from '../../../components/auth/AuthFooter';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    sponsorPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            phone: formData.phone
          }
        }
      });

      if (authError) throw authError;

      // Store device info
      const deviceInfo = getDeviceInfo();
      await supabase.from('user_devices').insert({
        user_id: authData.user?.id,
        ...deviceInfo
      });

      navigate('/auth/face-setup');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <div className="space-y-6">
        <SignUpForm
          formData={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
        <AuthFooter mode="signup" />
      </div>
    </AuthLayout>
  );
}