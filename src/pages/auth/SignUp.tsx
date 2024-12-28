import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import SubmitButton from '../../components/auth/SubmitButton';

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create auth user
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

      // Check for sponsor
      let sponsorId = null;
      if (formData.sponsorPhone) {
        const { data: sponsorData } = await supabase
          .from('profiles')
          .select('id')
          .eq('phone', formData.sponsorPhone)
          .single();
        
        if (sponsorData) {
          sponsorId = sponsorData.id;
        }
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user?.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          sponsor_id: sponsorId
        });

      if (profileError) throw profileError;

      // Proceed to facial recognition
      navigate('/auth/face-setup');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <FormInput
              label="First Name"
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <FormInput
              label="Last Name"
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <FormInput
              label="Email"
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <SubmitButton
              type="button"
              onClick={() => setStep(2)}
              loading={false}
              text="Next"
            />
          </>
        ) : (
          <>
            <FormInput
              label="Phone Number (This will be your account number)"
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <FormInput
              label="Password"
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <FormInput
              label="Sponsor's Phone Number (Optional)"
              id="sponsorPhone"
              type="tel"
              value={formData.sponsorPhone}
              onChange={(e) => setFormData({ ...formData, sponsorPhone: e.target.value })}
            />
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <div className="flex gap-4">
              <SubmitButton
                type="button"
                onClick={() => setStep(1)}
                loading={false}
                text="Back"
              />
              <SubmitButton
                loading={loading}
                loadingText="Creating account..."
                text="Sign up"
              />
            </div>
          </>
        )}
      </form>
    </AuthLayout>
  );
}