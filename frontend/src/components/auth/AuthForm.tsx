import { FC, FormEvent } from 'react';
import FormField from '../ui/forms/FormField';
import Button from '../ui/Button';

type Mode = 'signin' | 'register';

type Props = {
  mode: Mode;
  userName: string;
  password: string;
  error: string;
  loading: boolean;
  onUserNameChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const AuthForm: FC<Props> = ({ mode, userName, password, error, loading, onUserNameChange, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <FormField id="username" label="Username" type="text" value={userName} onChange={onUserNameChange} />
    <FormField id="password" label="Password" type="password" value={password} onChange={onPasswordChange} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') : (mode === 'signin' ? 'Sign In' : 'Register')}
    </Button>
  </form>
);

export default AuthForm;
