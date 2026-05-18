import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHistory } from '../../api/searchHistory';
import SearchInput from './SearchInput';
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
      <SearchInput
        value={query}
        onChange={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmit={handleSearch}
      />

        {showDropdown && (
          <SearchDropdown onSearch={handleSearch} />
        )}
    </div>
  );
};

export default Search;
