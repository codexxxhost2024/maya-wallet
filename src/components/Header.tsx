import { Link } from 'react-router-dom';
import Logo from './common/Logo';

export default function Header() {
  return (
    <header className="bg-[#6CBF41] p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/notifications">
          <span className="material-icons text-white text-2xl">notifications</span>
        </Link>
        <Link to="/support">
          <span className="material-icons text-white text-2xl">support_agent</span>
        </Link>
      </div>
    </header>
  );
}