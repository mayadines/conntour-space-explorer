import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHistory } from '../../api/searchHistory';
import { SearchIcon } from '../ui/icons/index';
import SearchDropdown from './SearchDropdown';

import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ initialQuery = '' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (q = query) => {
    const trimmed = q.trim();
    if (trimmed) addHistory(trimmed).catch(() => {});
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  };

  const showDropdown = !query.trim() && focused;

  return (
    <div className="py-4 relative">
      <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {showDropdown && (
          <SearchDropdown onSearch={handleSearch} />
        )}
    </div>
  );
};

export default Search;
