import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';

const Logo: FC = () => (
  <img
    src={`${process.env.PUBLIC_URL}/logo.png`}
    alt="NASA Images Search logo"
    className="h-16"
  />
);

const Navbar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <Logo />
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-red-500 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
