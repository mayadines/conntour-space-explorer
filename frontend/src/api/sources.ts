import axios from 'axios';

export interface Source {
  id: number;
  name: string;
  description: string;
  launch_date: string;
  image_url: string | null;
  type: string;
  status: string;
}

export interface SearchResult {
  source: Source;
  score: number;
}

export interface SearchResponse {
  items: SearchResult[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface EqualityFilter {
  field: string;
  type: 'equality';
  value: string | number | boolean;
}

export interface RangeFilter {
  field: string;
  type: 'range';
  from?: string;
  to?: string;
}

export type FilterItem = EqualityFilter | RangeFilter;

export const searchSources = async (
  query: string,
  page = 1,
  pageSize = 6,
  filters: FilterItem[] = [],
  signal?: AbortSignal
): Promise<SearchResponse> => {
  const { data } = await axios.get<SearchResponse>('/api/sources/search', {
    params: {
      q: query,
      page,
      page_size: pageSize,
      ...(filters.length > 0 && { filters: JSON.stringify(filters) }),
    },
    signal,
  });
  return data;
};
