import { FC } from 'react';

type Mode = 'signin' | 'register';

const AuthToggle: FC<{ mode: Mode; onSwitch: () => void }> = ({ mode, onSwitch }) => (
  <p className="mt-4 text-sm text-gray-600 text-center">
    {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
    <button onClick={onSwitch} className="text-blue-600 hover:underline">
      {mode === 'signin' ? 'Register' : 'Sign In'}
    </button>
  </p>
);

export default AuthToggle;
