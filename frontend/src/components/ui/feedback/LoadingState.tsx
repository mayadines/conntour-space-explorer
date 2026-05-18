import { FC } from 'react';
import Spinner from './Spinner';

const LoadingState: FC = () => (
  <div className="flex justify-center py-12"><Spinner /></div>
);

export default LoadingState;
