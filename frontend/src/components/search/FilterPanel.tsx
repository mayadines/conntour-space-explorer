import { FC, useState } from 'react';
import { EqualityFilter, FilterItem, RangeFilter } from '../../api/sources';

interface FilterPanelProps {
  filters: FilterItem[];
  onChange: (filters: FilterItem[]) => void;
}

function getEquality(filters: FilterItem[], field: string): string | undefined {
  const f = filters.find((f): f is EqualityFilter => f.field === field && f.type === 'equality');
  return f ? String(f.value) : undefined;
}

function getRange(filters: FilterItem[], field: string): RangeFilter | undefined {
  return filters.find((f): f is RangeFilter => f.field === field && f.type === 'range');
}

function setEquality(filters: FilterItem[], field: string, value: string | null): FilterItem[] {
  const rest = filters.filter(f => !(f.field === field && f.type === 'equality'));
  return value !== null ? [...rest, { field, type: 'equality', value }] : rest;
}

function setRange(filters: FilterItem[], field: string, from?: string, to?: string): FilterItem[] {
  const rest = filters.filter(f => !(f.field === field && f.type === 'range'));
  return from || to ? [...rest, { field, type: 'range', from, to }] : rest;
}

const FilterPanel: FC<FilterPanelProps> = ({ filters, onChange }) => {
  const [open, setOpen] = useState(false);

  const activeStatus = getEquality(filters, 'status');
  const dateRange = getRange(filters, 'launch_date');
  const hasActiveFilters = filters.length > 0;

  const handleActiveToggle = () => {
    onChange(setEquality(filters, 'status', activeStatus === 'Active' ? null : 'Active'));
  };

  const handleDateFrom = (val: string) => {
    onChange(setRange(filters, 'launch_date', val || undefined, dateRange?.to));
  };

  const handleDateTo = (val: string) => {
    onChange(setRange(filters, 'launch_date', dateRange?.from, val || undefined));
  };

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
            {filters.length}
          </span>
        )}
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-wrap gap-6 items-end">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Active only</label>
            <button
              type="button"
              role="switch"
              aria-checked={activeStatus === 'Active'}
              onClick={handleActiveToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeStatus === 'Active' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                activeStatus === 'Active' ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Launch date from</label>
            <input
              type="date"
              value={dateRange?.from ?? ''}
              onChange={e => handleDateFrom(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Launch date to</label>
            <input
              type="date"
              value={dateRange?.to ?? ''}
              onChange={e => handleDateTo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
