import axios from 'axios';
import { SearchHistory, SearchHistoryPage } from '../types';

export const getHistory = async (page = 1, pageSize = 3): Promise<SearchHistoryPage> => {
  const { data } = await axios.get<SearchHistoryPage>('/api/search-history', {
    params: { page, page_size: pageSize },
  });
  return data;
};

export const addHistory = async (search_query: string): Promise<SearchHistory> => {
  const { data } = await axios.post<SearchHistory>('/api/search-history', { search_query });
  return data;
};
