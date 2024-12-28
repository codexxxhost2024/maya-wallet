import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import TopNav from '../../components/TopNav';
import WalletBalance from '../../components/WalletBalance';
import PromoCard from '../../components/PromoCard';
import ServiceGrid from '../../components/ServiceGrid';
import RecentTransactions from '../../components/RecentTransactions';
import BottomNav from '../../components/BottomNav';

export default function HomePage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/onboarding');
    }
  }, [session, navigate]);

  return (
    <div className="max-w-lg mx-auto bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <TopNav />
      <main className="flex-1 p-4">
        <WalletBalance />
        <PromoCard />
        <ServiceGrid />
        <RecentTransactions />
      </main>
      <BottomNav />
    </div>
  );
}