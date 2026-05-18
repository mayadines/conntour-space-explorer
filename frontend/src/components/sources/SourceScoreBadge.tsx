import { FC } from 'react';
import { SourceScoreBadgeProps } from './types';

const SourceScoreBadge: FC<SourceScoreBadgeProps> = ({ score }) => (
  <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
    ★ {score}
  </span>
);

export default SourceScoreBadge;
