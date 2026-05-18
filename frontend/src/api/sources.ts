import axios from 'axios';
import { SearchResponse, SearchResult, Source } from '../types';

export const fetchSources = async (signal?: AbortSignal): Promise<Source[]> => {
  const { data } = await axios.get<Source[]>('/api/sources', { signal });
  return data;
};

export const searchSources = async (
  query: string,
  page = 1,
  pageSize = 20,
  signal?: AbortSignal
): Promise<SearchResult[]> => {
  const { data } = await axios.get<SearchResponse>('/api/sources/search', {
    params: { q: query, page, page_size: pageSize },
    signal,
  });
  return data.items;
};
