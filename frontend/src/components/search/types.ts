import { SearchResult } from '../../api/sources';

export interface SearchProps {
  initialQuery?: string;
}

export interface ResultsListProps {
  results: SearchResult[];
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}
