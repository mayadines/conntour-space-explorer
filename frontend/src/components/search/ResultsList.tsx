import { FC } from 'react';
import Pagination from '../ui/layout/Pagination';
import SourceCard from '../sources/SourceCard';
import { SearchResult } from '../../types';

interface ResultsListProps {
  results: SearchResult[];
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const ResultsList: FC<ResultsListProps> = ({ results, page, totalPages, onPrev, onNext }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {results.map(({ source, score }) => (
        <SourceCard key={source.id} source={source} score={score} />
      ))}
    </div>
    <Pagination page={page} totalPages={totalPages} onPrev={onPrev} onNext={onNext} />
  </>
);

export default ResultsList;
