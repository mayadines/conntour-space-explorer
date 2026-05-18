import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHistory, getHistory } from '../../api/searchHistory';
import { SearchHistory } from '../../types';

interface Props {
  initialQuery?: string;
}

const Search: FC<Props> = ({ initialQuery = '' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setHistoryLoaded(false);
      setPage(1);
      getHistory(1)
        .then(res => {
          setHistory(res.items);
          setHasMore(res.has_more);
        })
        .catch(() => setHistory([]))
        .finally(() => setHistoryLoaded(true));
    }
  }, [query]);

  const loadMore = () => {
    const nextPage = page + 1;
    getHistory(nextPage).then(res => {
      setHistory(prev => [...prev, ...res.items]);
      setHasMore(res.has_more);
      setPage(nextPage);
    });
  };

  const handleSearch = (q = query) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    addHistory(trimmed).catch(() => {});
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
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
          onClick={() => handleSearch()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      {!query.trim() && historyLoaded && (
        history.length === 0 ? (
          <p className="mt-2 px-4 py-2 text-sm text-gray-400">No history found</p>
        ) : (
          <>
            <ul className="mt-2 border rounded-lg divide-y bg-white shadow-sm">
              {history.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSearch(item.search_query)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 text-gray-700 text-sm"
                >
                  {item.search_query}
                </li>
              ))}
            </ul>
            {hasMore && (
              <button
                onClick={loadMore}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700 px-4"
              >
                Show more
              </button>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Search;
