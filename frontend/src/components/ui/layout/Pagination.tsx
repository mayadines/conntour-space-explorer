import { FC } from 'react';
import { PaginationProps } from './types';
import Button from '../Button';

const Pagination: FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <Button variant="icon" onClick={onPrev} disabled={page === 1} aria-label="Previous page">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      <span className="text-gray-300 text-sm font-medium">
        {page} / {totalPages}
      </span>
      <Button variant="icon" onClick={onNext} disabled={page === totalPages} aria-label="Next page">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
