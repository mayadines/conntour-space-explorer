import { FC, ReactElement, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from './api/auth';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import Search from './components/sources/Search';
import Sources from './components/sources/Sources';

const isAuthenticated = () => !!localStorage.getItem('access_token');

const ProtectedRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? element : <Navigate to="/signin" replace />;

const PublicOnlyRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? <Navigate to="/" replace /> : element;

const Navbar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <span className="font-semibold text-gray-800">Space Explorer</span>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-red-500 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

const Home: FC = () => {
  const [query, setQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Search query={query} setQuery={setQuery} setSearchActive={setSearchActive} />
      {!searchActive && <Sources />}
    </div>
  );
};

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/signin" element={<PublicOnlyRoute element={<SignIn />} />} />
      <Route path="/register" element={<PublicOnlyRoute element={<Register />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
