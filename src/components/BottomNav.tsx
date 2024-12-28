import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'anchor', label: 'Panyero', route: '/' },
  { icon: 'account_balance_wallet', label: 'Finance', route: '/wallet' },
  { icon: 'qr_code_scanner', label: 'Scan', route: '/scanqr' },
  { icon: 'dns', label: 'Services', route: '/services' },
  { icon: 'person', label: 'Profile', route: '/profile' }
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bg-white border-t border-gray-200 flex justify-around items-center p-2 fixed bottom-0 w-full max-w-lg">
      {navItems.map((item) => (
        <Link
          to={item.route}
          key={item.label}
          className={`flex flex-col items-center ${
            location.pathname === item.route ? 'text-[#6CBF41]' : 'text-gray-500'
          }`}
        >
          <span className="material-icons text-2xl">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}