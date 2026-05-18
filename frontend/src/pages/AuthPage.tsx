import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import AuthCard from '../components/auth/AuthCard';
import AuthForm from '../components/auth/AuthForm';
import AuthToggle from '../components/auth/AuthToggle';

type Mode = 'signin' | 'register';

const AuthPage: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('signin');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await register(userName, password);
      }
      await login(userName, password);
      navigate('/');
    } catch {
      setError(mode === 'signin' ? 'Invalid username or password.' : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'register' : 'signin');
    setError('');
    setUserName('');
    setPassword('');
  };

  return (
    <AuthCard title={mode === 'signin' ? 'Sign In' : 'Create Account'}>
      <AuthForm
        mode={mode}
        userName={userName}
        password={password}
        error={error}
        loading={loading}
        onUserNameChange={setUserName}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
      <AuthToggle mode={mode} onSwitch={switchMode} />
    </AuthCard>
  );
};

export default AuthPage;
