import { useState } from 'react';
import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';

interface PhoneSignInFormProps {
  onSubmit: (phone: string) => void;
  loading: boolean;
  error?: string;
}

export default function PhoneSignInForm({ onSubmit, loading, error }: PhoneSignInFormProps) {
  const [phone, setPhone] = useState('');

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
      />
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <SubmitButton
        loading={loading}
        loadingText="Verifying..."
        text="Continue"
      />
    </form>
  );
}