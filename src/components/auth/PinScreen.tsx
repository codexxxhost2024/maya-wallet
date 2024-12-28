import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import AuthLayout from './AuthLayout';

export default function PinScreen() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a phone number for sign in
    const phone = sessionStorage.getItem('signin_phone');
    if (!phone) {
      navigate('/auth/signin');
    }
  }, [navigate]);

  const verifyPin = async (enteredPin: string) => {
    const phone = sessionStorage.getItem('signin_phone');
    if (!phone) return;

    try {
      // Get user by phone number
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('phone', phone)
        .single();

      if (userError || !user) throw new Error('User not found');

      // Sign in with email (stored in auth) and PIN as password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: enteredPin
      });

      if (signInError) throw signInError;

      // Clear stored phone
      sessionStorage.removeItem('signin_phone');
      navigate('/home');
    } catch (err) {
      setError('Invalid PIN');
      setPin(['', '', '', '', '', '']);
      document.getElementById('pin-0')?.focus();
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }

    // If all digits are entered, verify PIN
    if (index === 5 && value) {
      verifyPin(newPin.join(''));
    }
  };

  return (
    <AuthLayout title="Enter PIN">
      <div className="space-y-6">
        <div className="flex justify-center space-x-2">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              maxLength={1}
              className="w-12 h-12 text-center border-2 rounded-lg focus:border-[#6CBF41] focus:ring-[#6CBF41]"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digit && index > 0) {
                  document.getElementById(`pin-${index - 1}`)?.focus();
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