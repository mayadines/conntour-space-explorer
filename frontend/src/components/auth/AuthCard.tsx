import { FC, ReactNode } from 'react';

const AuthCard: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      {children}
    </div>
  </div>
);

export default AuthCard;
