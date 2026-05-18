import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHistory, clearHistory, deleteHistoryItem, getHistory } from '../../api/searchHistory';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, SearchIcon, TrashIcon } from '../ui/icons/index';
import { SearchHistory } from '../../api/searchHistory';

import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ initialQuery = '' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [focused, setFocused] = useState(false);

  const fetchPage = (p: number) => {
    setHistoryLoaded(false);
    getHistory(p)
      .then(res => {
        setHistory(res.items);
        setTotalPages(Math.ceil(res.total / res.page_size) || 1);
        setPage(p);
      })
      .catch(() => setHistory([]))
      .finally(() => setHistoryLoaded(true));
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!query.trim()) fetchPage(1);
  }, [query]);

  const handleSearch = (q = query) => {
    const trimmed = q.trim();
    if (trimmed) addHistory(trimmed).catch(() => {});
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteHistoryItem(id).then(() => fetchPage(page));
  };

  const handleClear = () => {
    clearHistory().then(() => {
      setHistory([]);
      setPage(1);
      setTotalPages(1);
    });
  };

  const showDropdown = !query.trim() && historyLoaded && focused;

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
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
          <button
            onClick={() => handleSearch()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {showDropdown && (
          <div onMouseDown={e => e.preventDefault()} className="absolute top-full left-0 right-14 mt-1 bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
            <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Recent Searches
            </p>

            {history.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400">No history found</p>
            ) : (
              <ul className="divide-y">
                {history.map(item => (
                  <li
                    key={item.id}
                    onClick={() => handleSearch(item.search_query)}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    <ClockIcon />
                    <span className="flex-1 text-sm text-gray-700">{item.search_query}</span>
                    <button
                      onClick={e => handleDelete(e, item.id)}
                      className="text-gray-300 hover:text-gray-500 text-lg leading-none"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between px-4 py-2 border-t">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600"
              >
                <TrashIcon />
                Clear History
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchPage(page - 1)}
                  disabled={page <= 1}
                  className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon />
                </button>
                <span className="text-xs text-gray-400">{page} / {totalPages}</span>
                <button
                  onClick={() => fetchPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
