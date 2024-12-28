import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <nav className="bg-white p-4 border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-8">
        <Link to="/" className="text-[#6CBF41] font-semibold border-b-2 border-[#6CBF41] pb-1">
          Wallet
        </Link>
        <Link to="/savings" className="text-gray-600 font-semibold">
          Savings
        </Link>
        <Link to="/credit" className="text-gray-600 font-semibold">
          Credit
        </Link>
        <Link to="/loans" className="text-gray-600 font-semibold">
          Loans
        </Link>
        <Link to="/cards" className="text-gray-600 font-semibold">
          Cards
        </Link>
      </div>
    </nav>
  );
}