import { FC } from 'react';
import { SourceLaunchDateProps } from './types';

const SourceLaunchDate: FC<SourceLaunchDateProps> = ({ date }) => (
  <p className="text-gray-400 text-sm mb-3">
    <span className="text-gray-500 font-medium">Launch Date:</span>{' '}
    {new Date(date).toLocaleDateString()}
  </p>
);

export default SourceLaunchDate;
