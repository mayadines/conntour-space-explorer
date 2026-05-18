import { FC } from 'react';
import TruncatedText from '../ui/TruncatedText';
import SourceStatus from './SourceStatus';
import { SourceCardHeaderProps } from './types';

const SourceCardHeader: FC<SourceCardHeaderProps> = ({ name, status }) => (
  <div className="flex items-start justify-between gap-2 mb-1">
    <TruncatedText text={name} variant="title" />
    <SourceStatus status={status} />
  </div>
);

export default SourceCardHeader;
