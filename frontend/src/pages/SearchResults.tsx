import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchSources } from '../api/sources';
import Navbar from '../components/ui/layout/Navbar';
import Search from '../components/search/Search';
import LoadingState from '../components/ui/feedback/LoadingState';
import ErrorState from '../components/ui/feedback/ErrorState';
import EmptyState from '../components/ui/feedback/EmptyState';
import ResultsList from '../components/search/ResultsList';
import { SearchResult } from '../types';

const PAGE_SIZE = 6;
const SEARCH_PARAM = 'q';

const SearchResults: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_PARAM) ?? '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevQueryRef = useRef(query);

  if (prevQueryRef.current !== query) {
    prevQueryRef.current = query;
    setPage(1);
  }

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

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (results.length === 0) return <EmptyState query={query} />;
    return (
      <ResultsList
        results={results}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => p - 1)}
        onNext={() => setPage(p => p + 1)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <Search initialQuery={query} />
        {renderContent()}
      </div>
    </div>
  );
};

export default SearchResults;
