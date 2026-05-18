import { FC } from 'react';
import { IconProps } from './types';

const SearchIcon: FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2" />
    <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
  </svg>
);

export default SearchIcon;
