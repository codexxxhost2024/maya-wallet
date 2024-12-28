import { useState } from 'react';
import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error?: string;
}

export default function SignInForm({ onSubmit, loading, error }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Email"
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <SubmitButton
        loading={loading}
        loadingText="Signing in..."
        text="Sign in"
      />
    </form>
  );
}