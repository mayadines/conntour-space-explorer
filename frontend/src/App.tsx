import { FC, ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SearchResults from './pages/SearchResults';

const isAuthenticated = () => !!localStorage.getItem('access_token');

const ProtectedRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? element : <Navigate to="/auth" replace />;

const PublicOnlyRoute: FC<{ element: ReactElement }> = ({ element }) =>
  isAuthenticated() ? <Navigate to="/" replace /> : element;

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<SearchResults />} />} />
      <Route path="/auth" element={<PublicOnlyRoute element={<AuthPage />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
