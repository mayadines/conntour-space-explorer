import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchSources } from '../api/sources';
import Navbar from '../components/ui/Navbar';
import Search from '../components/sources/Search';
import SourceCard from '../components/sources/SourceCard';
import Spinner from '../components/ui/Spinner';
import { SearchResult } from '../types';

const SearchResults: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchSources(query, 1, 20, controller.signal)
      .then(setResults)
      .catch(err => {
        if (!axios.isCancel(err)) setError('Search failed. Please try again.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <Search initialQuery={query} />
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500 text-center py-12">{query ? `No results found for "${query}"` : 'No results found'}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {results.map(({ source, score }) => (
              <SourceCard key={source.id} source={source} score={score} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
