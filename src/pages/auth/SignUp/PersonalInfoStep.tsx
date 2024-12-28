import FormInput from '../../../components/auth/FormInput';
import SubmitButton from '../../../components/auth/SubmitButton';
import AuthFooter from '../../../components/auth/AuthFooter';

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  onChange: (data: Partial<typeof formData>) => void;
}

export default function PersonalInfoStep({ formData, onChange }: PersonalInfoStepProps) {
  return (
    <>
      <FormInput
        label="First Name"
        id="firstName"
        required
        value={formData.firstName}
        onChange={(e) => onChange({ firstName: e.target.value })}
      />
      <FormInput
        label="Last Name"
        id="lastName"
        required
        value={formData.lastName}
        onChange={(e) => onChange({ lastName: e.target.value })}
      />
      <FormInput
        label="Email"
        id="email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => onChange({ email: e.target.value })}
      />
      <SubmitButton
        type="submit"
        loading={false}
        text="Next"
      />
      <AuthFooter mode="signup" />
    </>
  );
}