import { FC } from 'react';
import { PaginationProps } from './types';
import Button from '../Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

const Pagination: FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <Button variant="icon" onClick={onPrev} disabled={page === 1} aria-label="Previous page">
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>
      <span className="text-gray-300 text-sm font-medium">
        {page} / {totalPages}
      </span>
      <Button variant="icon" onClick={onNext} disabled={page === totalPages} aria-label="Next page">
        <ChevronRightIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Pagination;
