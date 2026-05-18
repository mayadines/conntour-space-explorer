import axios from 'axios';

export interface SearchHistory {
  id: number;
  user_id: number;
  search_query: string;
}

export interface SearchHistoryPage {
  items: SearchHistory[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

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

export const deleteHistoryItem = async (id: number): Promise<void> => {
  await axios.delete(`/api/search-history/${id}`);
};

export const clearHistory = async (): Promise<void> => {
  await axios.delete('/api/search-history');
};
