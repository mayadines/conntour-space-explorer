import { FC } from 'react';
import { ButtonProps } from './types';

const styles = {
  default: 'inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors',
  icon: 'p-2 text-gray-500 rounded-md hover:text-blue-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors',
};

const Button: FC<ButtonProps> = ({ children, variant = 'default', type = 'button', ...rest }) => (
  <button type={type} {...rest} className={styles[variant]}>
    {children}
  </button>
);

export default Button;
