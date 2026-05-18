import { FC } from 'react';
import AuthCard from '../components/auth/AuthCard';
import AuthForm from '../components/auth/AuthForm';
import AuthToggle from '../components/auth/AuthToggle';
import useToggle from '../hooks/useToggle';
import { AuthMode } from '../types';

const AuthPage: FC = () => {
  const [mode, switchMode] = useToggle<AuthMode>('signin', 'register');

  return (
    <AuthCard title={mode === 'signin' ? 'Sign In' : 'Create Account'}>
      <AuthForm mode={mode} />
      <AuthToggle mode={mode} onSwitch={switchMode} />
    </AuthCard>
  );
};

export default AuthPage;
