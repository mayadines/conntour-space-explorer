import axios from 'axios';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterItem, SearchResult, searchSources } from '../api/sources';
import Navbar from '../components/ui/layout/Navbar';
import Search from '../components/search/Search';
import FilterPanel from '../components/search/FilterPanel';
import LoadingState from '../components/ui/feedback/LoadingState';
import ErrorState from '../components/ui/feedback/ErrorState';
import EmptyState from '../components/ui/feedback/EmptyState';
import ResultsList from '../components/search/ResultsList';

const PAGE_SIZE = 6;
const SEARCH_PARAM = 'q';
const FILTERS_PARAM = 'filters';

const SearchResults: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_PARAM) ?? '';
  const filtersJson = searchParams.get(FILTERS_PARAM) ?? '';
  const filters = useMemo<FilterItem[]>(() => {
    try {
      return filtersJson ? JSON.parse(filtersJson) : [];
    } catch {
      return [];
    }
  }, [filtersJson]);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevQueryRef = useRef(query);
  const prevFiltersRef = useRef(filtersJson);

  const queryChanged = prevQueryRef.current !== query;
  const filtersChanged = prevFiltersRef.current !== filtersJson;

  if (queryChanged || filtersChanged) {
    prevQueryRef.current = query;
    prevFiltersRef.current = filtersJson;
    setPage(1);
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchSources(query, page, PAGE_SIZE, filters, controller.signal)
      .then(data => {
        setResults(data.items);
        setTotalPages(data.pages);
      })
      .catch(err => {
        if (!axios.isCancel(err)) setError('Search failed. Please try again.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query, page, filters]);

  const handleFiltersChange = useCallback((next: FilterItem[]) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      if (next.length > 0) {
        updated.set(FILTERS_PARAM, JSON.stringify(next));
      } else {
        updated.delete(FILTERS_PARAM);
      }
      return updated;
    });
  }, [setSearchParams]);

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
      <div className="container mx-auto px-4">
        <Search initialQuery={query} />
        <FilterPanel filters={filters} onChange={handleFiltersChange} />
        {renderContent()}
      </div>
    </div>
  );
};

export default SearchResults;
