import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../api/auth';
import Button from '../Button';

const Navbar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="NASA Images Search logo"
          className="h-16"
        />
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;
