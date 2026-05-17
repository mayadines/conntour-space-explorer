import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { SearchResponse, SearchResult } from '../types';
import SourceCard from './SourceCard';
import Spinner from './Spinner';

interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setSearchActive: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<Props> = ({ query, setQuery, setSearchActive }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const prefetchCache = useRef<Map<string, SearchResult[]>>(new Map());

  // Silently prefetch in background as the user types
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || prefetchCache.current.has(trimmed)) return;
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get<SearchResponse>('/api/sources/search', {
          params: { q: trimmed, page: 1, page_size: 20 },
        });
        prefetchCache.current.set(trimmed, response.data.items);
      } catch {
        // silently ignore prefetch errors
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults(null);
      setSearchError(null);
      setSearchActive(false);
      return;
    }
    setSearchActive(true);
    setSearchError(null);
    const cached = prefetchCache.current.get(trimmed);
    if (cached) {
      setSearchResults(cached);
      return;
    }
    setSearching(true);
    try {
      const response = await axios.get<SearchResponse>('/api/sources/search', {
        params: { q: trimmed, page: 1, page_size: 20 },
      });
      prefetchCache.current.set(trimmed, response.data.items);
      setSearchResults(response.data.items);
    } catch {
      setSearchError('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  }, [query, setSearchActive]);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => {
              setQuery(e.target.value);
              if (!e.target.value.trim()) setSearchActive(false);
            }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
      {searching ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : searchError ? (
        <p className="text-red-500 text-center py-12">{searchError}</p>
      ) : searchResults !== null && (
        searchResults.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No results found for "{query}"</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(({ source, score }) => (
              <SourceCard key={source.id} source={source} score={score} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Search;
