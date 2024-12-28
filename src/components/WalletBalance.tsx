import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { auth } from '../lib/firebase';

export default function WalletBalance() {
  const [balance, setBalance] = useState('₱0');

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setBalance('₱0');
          return;
        }

        const { data, error } = await supabase
          .from('users')  // Changed from 'profiles' to 'users'
          .select('wallet_balance')  // Changed from 'walletbalance' to 'wallet_balance'
          .eq('id', user.uid)
          .single();

        if (error) throw error;
        setBalance(`₱${data.wallet_balance}`);
      } catch (err) {
        console.error('Failed to load balance:', err);
        setBalance('₱0');
      }
    };

    loadBalance();
    auth.onAuthStateChanged(() => loadBalance());
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow">
      <div className="text-3xl font-bold">{balance}</div>
      <div className="text-gray-500 text-sm">Available balance</div>
      <div className="mt-4 flex gap-4">
        <button className="flex-1 bg-[#6CBF41] text-white p-3 rounded-lg">
          Cash In
        </button>
        <button className="flex-1 bg-[#6CBF41] text-white p-3 rounded-lg">
          Transfer
        </button>
      </div>
    </div>
  );
}