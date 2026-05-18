import { FC } from 'react';
import { SearchIcon } from '../ui/icons/index';
import { SearchInputProps } from './types';

const SearchInput: FC<SearchInputProps> = ({ value, onChange, onFocus, onBlur, onSubmit }) => (
  <div className="relative">
    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search images..."
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={e => e.key === 'Enter' && onSubmit()}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchInput;
