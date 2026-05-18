import { FC, ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import SignIn from './pages/SignIn';

const isAuthenticated = () => !!localStorage.getItem('access_token');

const ProtectedRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? element : <Navigate to="/signin" replace />;

const PublicOnlyRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? <Navigate to="/" replace /> : element;

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<SearchResults />} />} />
      <Route path="/search" element={<ProtectedRoute element={<SearchResults />} />} />
      <Route path="/signin" element={<PublicOnlyRoute element={<SignIn />} />} />
      <Route path="/register" element={<PublicOnlyRoute element={<Register />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
