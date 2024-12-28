import { useState } from 'react';
import PersonalInfoStep from './PersonalInfoStep';
import AccountInfoStep from './AccountInfoStep';

interface SignUpFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    sponsorPhone: string;
  };
  onChange: (data: Partial<typeof formData>) => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string;
}

export default function SignUpForm({ formData, onChange, onSubmit, loading, error }: SignUpFormProps) {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <PersonalInfoStep formData={formData} onChange={onChange} />
      ) : (
        <AccountInfoStep
          formData={formData}
          onChange={onChange}
          onBack={() => setStep(1)}
          loading={loading}
          error={error}
        />
      )}
    </form>
  );
}