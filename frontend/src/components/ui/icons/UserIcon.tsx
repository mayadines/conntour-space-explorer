import { FC } from 'react';

interface Props { className?: string; }

const UserIcon: FC<Props> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" strokeWidth="2" />
  </svg>
);

export default UserIcon;
