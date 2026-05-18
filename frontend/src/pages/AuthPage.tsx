import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import FormField from '../components/ui/forms/FormField';

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
      if (mode === 'signin') {
        await login(userName, password);
        navigate('/');
      } else {
        await register(userName, password);
        setMode('signin');
        setUserName('');
        setPassword('');
      }
    } catch {
      setError(mode === 'signin' ? 'Invalid username or password.' : 'Registration failed. Username may already be taken.');
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField id="username" label="Username" type="text" value={userName} onChange={setUserName} />
          <FormField id="password" label="Password" type="password" value={password} onChange={setPassword} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') : (mode === 'signin' ? 'Sign In' : 'Register')}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={switchMode} className="text-blue-600 hover:underline">
            {mode === 'signin' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
