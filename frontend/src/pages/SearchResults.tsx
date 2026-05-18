import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchSources } from '../api/sources';
import Navbar from '../components/ui/Navbar';
import Pagination from '../components/ui/Pagination';
import Search from '../components/sources/Search';
import SourceCard from '../components/sources/SourceCard';
import Spinner from '../components/ui/Spinner';
import { SearchResult } from '../types';

const PAGE_SIZE = 6;

const SearchResults: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchSources(query, page, PAGE_SIZE, controller.signal)
      .then(data => {
        setResults(data.items);
        setTotalPages(data.pages);
      })
      .catch(err => {
        if (!axios.isCancel(err)) setError('Search failed. Please try again.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query, page]);

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {results.map(({ source, score }) => (
                <SourceCard key={source.id} source={source} score={score} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage(p => p - 1)}
              onNext={() => setPage(p => p + 1)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
