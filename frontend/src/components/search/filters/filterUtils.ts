import { EqualityFilter, FilterItem, RangeFilter } from '../../../api/sources';

export function getEquality(filters: FilterItem[], field: string): string | undefined {
  const f = filters.find((f): f is EqualityFilter => f.field === field && f.type === 'equality');
  return f ? String(f.value) : undefined;
}

export function getRange(filters: FilterItem[], field: string): RangeFilter | undefined {
  return filters.find((f): f is RangeFilter => f.field === field && f.type === 'range');
}

export function setEquality(filters: FilterItem[], field: string, value: string | null): FilterItem[] {
  const rest = filters.filter(f => !(f.field === field && f.type === 'equality'));
  return value !== null ? [...rest, { field, type: 'equality', value }] : rest;
}

export function setRange(filters: FilterItem[], field: string, from?: string, to?: string): FilterItem[] {
  const rest = filters.filter(f => !(f.field === field && f.type === 'range'));
  return from || to ? [...rest, { field, type: 'range', from, to }] : rest;
}
