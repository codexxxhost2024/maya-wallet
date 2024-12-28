import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';

interface AccountInfoStepProps {
  formData: {
    phone: string;
    password: string;
    sponsorPhone: string;
  };
  onChange: (data: Partial<typeof formData>) => void;
  onBack: () => void;
  loading: boolean;
  error?: string;
}

export default function AccountInfoStep({ 
  formData, 
  onChange, 
  onBack, 
  loading, 
  error 
}: AccountInfoStepProps) {
  return (
    <>
      <FormInput
        label="Phone Number"
        id="phone"
        type="tel"
        required
        value={formData.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        required
        value={formData.password}
        onChange={(e) => onChange({ password: e.target.value })}
      />
      <FormInput
        label="Sponsor's Phone Number (Optional)"
        id="sponsorPhone"
        type="tel"
        value={formData.sponsorPhone}
        onChange={(e) => onChange({ sponsorPhone: e.target.value })}
      />
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <div className="flex gap-4">
        <SubmitButton
          type="button"
          onClick={onBack}
          loading={false}
          text="Back"
        />
        <SubmitButton
          type="submit"
          loading={loading}
          loadingText="Creating account..."
          text="Sign up"
        />
      </div>
      <AuthFooter mode="signup" />
    </>
  );
}