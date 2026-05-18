import { SearchResult } from '../../api/sources';

export interface SearchProps {
  initialQuery?: string;
}

export interface SearchDropdownProps {
  onSearch: (query: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: () => void;
}

export interface ResultsListProps {
  results: SearchResult[];
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}
