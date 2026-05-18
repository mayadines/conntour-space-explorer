import { FC } from 'react';

const EmptyState: FC<{ query: string }> = ({ query }) => (
  <p className="text-gray-500 text-center py-12">
    {query ? `No results found for "${query}"` : 'No results found'}
  </p>
);

export default EmptyState;
