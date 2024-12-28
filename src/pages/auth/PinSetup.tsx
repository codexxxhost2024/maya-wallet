import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import SubmitButton from '../../components/auth/SubmitButton';

export default function PinSetup() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    if (value.length > 1) return;
    
    const newPin = isConfirm ? [...confirmPin] : [...pin];
    newPin[index] = value;
    
    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }

    if (value && index < 5) {
      const nextId = isConfirm ? `confirm-pin-${index + 1}` : `pin-${index + 1}`;
      document.getElementById(nextId)?.focus();
    }

    // If all digits are filled
    if (index === 5 && value) {
      if (!isConfirm) {
        setStep(2);
        setTimeout(() => document.getElementById('confirm-pin-0')?.focus(), 100);
      } else {
        const enteredPin = pin.join('');
        const confirmedPin = newPin.join('');
        
        if (enteredPin === confirmedPin) {
          localStorage.setItem('userPin', enteredPin);
          navigate('/home');
        } else {
          setError('PINs do not match');
          setConfirmPin(['', '', '', '', '', '']);
          setTimeout(() => document.getElementById('confirm-pin-0')?.focus(), 100);
        }
      }
    }
  };

  return (
    <AuthLayout title={step === 1 ? "Create your PIN" : "Confirm your PIN"}>
      <div className="space-y-6">
        <div className="flex justify-center space-x-2">
          {(step === 1 ? pin : confirmPin).map((digit, index) => (
            <input
              key={index}
              id={`${step === 1 ? 'pin' : 'confirm-pin'}-${index}`}
              type="password"
              maxLength={1}
              className="w-12 h-12 text-center border-2 rounded-lg focus:border-[#6CBF41] focus:ring-[#6CBF41]"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value, step === 2)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digit && index > 0) {
                  const prevId = step === 1 ? `pin-${index - 1}` : `confirm-pin-${index - 1}`;
                  document.getElementById(prevId)?.focus();
                }
              }}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </AuthLayout>
  );
}