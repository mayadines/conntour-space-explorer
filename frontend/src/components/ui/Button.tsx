import { FC } from 'react';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ type = 'button', disabled, onClick, className = '', children }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors ${className}`}
  >
    {children}
  </button>
);

export default Button;
