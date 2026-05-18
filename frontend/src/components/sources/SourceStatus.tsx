import { FC } from 'react';
import { SourceStatusProps } from './types';

const SourceStatus: FC<SourceStatusProps> = ({ status }) => (
  <span className="text-green-500 text-xs font-medium shrink-0 mt-1">{status}</span>
);

export default SourceStatus;
