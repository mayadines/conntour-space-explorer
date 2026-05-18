import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api/auth';
import FormField from '../ui/forms/FormField';
import Button from '../ui/Button';
import { AuthMode } from './types';

const AuthForm: FC<{ mode: AuthMode }> = ({ mode }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [mode]);

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
      setError(
        mode === 'register'
          ? 'Problem occurred during registration.'
          : 'Invalid username or password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="username" label="Username" type="text" value={userName} onChange={setUserName} />
      <FormField id="password" label="Password" type="password" value={password} onChange={setPassword} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading
          ? mode === 'signin' ? 'Signing in...' : 'Creating account...'
          : mode === 'signin' ? 'Sign In' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;
