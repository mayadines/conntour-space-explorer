import { FC, ReactNode } from 'react';
import useToggle from '../../hooks/useToggle';
import Button from '../ui/Button';
import { FilterItem } from '../../api/sources';
import ChevronDownIcon from '../ui/icons/ChevronDownIcon';
import FilterIcon from '../ui/icons/FilterIcon';
import { DateRangeFilterConfig, FilterConfig, FILTERS, ToggleFilterConfig } from './filters/filterConfig';
import { getEquality, getRange, setEquality, setRange } from './filters/filterUtils';
import ToggleFilter from './filters/ToggleFilter';
import DateRangeFilter from './filters/DateRangeFilter';

interface FilterPanelProps {
  filters: FilterItem[];
  onChange: (filters: FilterItem[]) => void;
}

type FilterRenderer = (config: FilterConfig, filters: FilterItem[], onChange: (f: FilterItem[]) => void) => ReactNode;

const FILTER_RENDERERS: Record<string, FilterRenderer> = {
  equality: (config, filters, onChange) => {
    const { field, label, value } = config as ToggleFilterConfig;
    const current = getEquality(filters, field);
    return (
      <ToggleFilter
        key={field}
        label={label}
        checked={current === value}
        onChange={checked => onChange(setEquality(filters, field, checked ? value : null))}
      />
    );
  },
  'range:date': (config, filters, onChange) => {
    const { field, label } = config as DateRangeFilterConfig;
    const range = getRange(filters, field);
    return (
      <DateRangeFilter
        key={field}
        label={label}
        from={range?.from}
        to={range?.to}
        onFromChange={val => onChange(setRange(filters, field, val || undefined, range?.to))}
        onToChange={val => onChange(setRange(filters, field, range?.from, val || undefined))}
      />
    );
  },
};

const getRendererKey = (config: FilterConfig) =>
  config.type === 'range' ? `range:${config.subtype}` : config.type;

const FilterPanel: FC<FilterPanelProps> = ({ filters, onChange }) => {
  const [open, toggleOpen] = useToggle(false, true);
  const hasActiveFilters = filters.length > 0;

  return (
    <div className="mb-2">
      <Button variant="icon" onClick={toggleOpen} aria-expanded={open}>
        <FilterIcon />
        Filters
        {hasActiveFilters && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
            {filters.length}
          </span>
        )}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {open && (
        <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-wrap gap-6 items-end">
          {FILTERS.map(config =>
            FILTER_RENDERERS[getRendererKey(config)]?.(config, filters, onChange) ?? null
          )}

          {hasActiveFilters && (
            <Button onClick={() => onChange([])}>Clear filters</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
