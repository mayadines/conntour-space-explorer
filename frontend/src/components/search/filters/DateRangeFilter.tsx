import { FC } from 'react';

interface DateRangeFilterProps {
  label: string;
  from?: string;
  to?: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

const DateRangeFilter: FC<DateRangeFilterProps> = ({ label, from, to, onFromChange, onToChange }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} from</label>
      <input
        type="date"
        value={from ?? ''}
        max={to}
        onChange={e => onFromChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} to</label>
      <input
        type="date"
        value={to ?? ''}
        min={from}
        onChange={e => onToChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </>
);

export default DateRangeFilter;
