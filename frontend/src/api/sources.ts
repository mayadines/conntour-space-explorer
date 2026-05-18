import axios from 'axios';
import { SearchResponse, Source } from '../types';

export const fetchSources = async (signal?: AbortSignal): Promise<Source[]> => {
  const { data } = await axios.get<Source[]>('/api/sources', { signal });
  return data;
};

export const searchSources = async (
  query: string,
  page = 1,
  pageSize = 6,
  signal?: AbortSignal
): Promise<SearchResponse> => {
  const { data } = await axios.get<SearchResponse>('/api/sources/search', {
    params: { q: query, page, page_size: pageSize },
    signal,
  });
  return data;
};
