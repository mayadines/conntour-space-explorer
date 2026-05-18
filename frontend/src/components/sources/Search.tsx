import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  initialQuery?: string;
}

const Search: FC<Props> = ({ initialQuery = '' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
