import { FC } from 'react';

const ErrorState: FC<{ message: string }> = ({ message }) => (
  <p className="text-red-500 text-center py-12">{message}</p>
);

export default ErrorState;
