export type ToggleFilterConfig = {
  field: string;
  type: 'equality';
  label: string;
  value: string;
};

export type DateRangeFilterConfig = {
  field: string;
  type: 'range';
  label: string;
  subtype: 'date';
};

export type FilterConfig = ToggleFilterConfig | DateRangeFilterConfig;

export const FILTERS: FilterConfig[] = [
  { field: 'status', type: 'equality', label: 'Active only', value: 'Active' },
  { field: 'launch_date', type: 'range', label: 'Launch date', subtype: 'date' },
];
