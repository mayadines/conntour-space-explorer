import { FC } from 'react';
import { ButtonProps } from './types';

const OutlineButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <button
    type="button"
    {...rest}
    className="border border-blue-500 text-blue-500 text-sm px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
  >
    {children}
  </button>
);

export default OutlineButton;
