import { FC } from 'react';
import { AuthMode } from './types';
import Button from '../ui/Button';

const AuthToggle: FC<{ mode: AuthMode; onSwitch: () => void }> = ({ mode, onSwitch }) => (
  <div className="mt-4 flex flex-col items-center gap-2">
    <p className="text-sm text-gray-600">
      {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
    </p>
    <Button onClick={onSwitch}>
      {mode === 'signin' ? 'Register' : 'Sign In'}
    </Button>
  </div>
);

export default AuthToggle;
