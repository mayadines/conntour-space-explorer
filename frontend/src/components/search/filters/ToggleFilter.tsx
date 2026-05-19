import { FC } from 'react';

interface ToggleFilterProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleFilter: FC<ToggleFilterProps> = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  </div>
);

export default ToggleFilter;
