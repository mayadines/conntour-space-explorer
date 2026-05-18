export type AuthMode = 'signin' | 'register';

export interface User {
  id: number;
  user_name: string;
}

export interface Source {
  id: number;
  name: string;
  description: string;
  launch_date: string;
  image_url: string;
  type: string;
  status: string;
}

export interface SearchResult {
  source: Source;
  score: number;
}

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

export interface SearchResponse {
  items: SearchResult[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}
