import { useState } from 'react';
import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';

interface LoginFormProps {
  onSubmit: (phone: string) => void;
  loading: boolean;
  error?: string;
}

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [phone, setPhone] = useState('09056741316'); // Pre-filled for demo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phone);
  };

  return (
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
  );
}