import { FC } from 'react';
import { SourceTypeBadgeProps } from './types';

const SourceTypeBadge: FC<SourceTypeBadgeProps> = ({ type }) => (
  <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
    {type}
  </span>
);

export default SourceTypeBadge;
