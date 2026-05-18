import { FC, useCallback, useEffect, useState } from 'react';
import { SearchHistory, clearHistory, deleteHistoryItem, getHistory } from '../../api/searchHistory';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, CloseIcon, TrashIcon } from '../ui/icons/index';
import Button from '../ui/Button';
import { SearchDropdownProps } from './types';

const SearchDropdown: FC<SearchDropdownProps> = ({ onSearch }) => {
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = useCallback((p: number) => {
    getHistory(p)
      .then(res => {
        setHistory(res.items);
        setTotalPages(Math.ceil(res.total / res.page_size) || 1);
        setPage(p);
      })
      .catch(() => setHistory([]));
  }, []);

  useEffect(() => { fetchPage(1); }, [fetchPage]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteHistoryItem(id)
      .then(() => {
        const targetPage = history.length === 1 && page > 1 ? page - 1 : page;
        fetchPage(targetPage);
      })
      .catch(err => console.error('Failed to delete history item', err));
  };

  const handleClear = () => {
    clearHistory()
      .then(() => {
        setHistory([]);
        setPage(1);
        setTotalPages(1);
      })
      .catch(err => console.error('Failed to clear history', err));
  };

  return (
    <div onMouseDown={e => e.preventDefault()} className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
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
              onClick={() => onSearch(item.search_query)}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
            >
              <ClockIcon />
              <span className="flex-1 text-sm text-gray-700">{item.search_query}</span>
              <Button variant="icon" onClick={e => handleDelete(e, item.id)}>
                <CloseIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between px-4 py-2 border-t">
        <Button onClick={handleClear}>
          <TrashIcon />
          Clear History
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="icon" onClick={() => fetchPage(page - 1)} disabled={page <= 1}>
            <ChevronLeftIcon />
          </Button>
          <span className="text-xs text-gray-400">{page} / {totalPages}</span>
          <Button variant="icon" onClick={() => fetchPage(page + 1)} disabled={page >= totalPages}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
