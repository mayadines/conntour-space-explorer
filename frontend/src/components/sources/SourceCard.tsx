import { FC } from 'react';
import SourceCardImage from './SourceCardImage';
import SourceCardBody from './SourceCardBody';
import { SourceCardProps } from './types';

const SourceCard: FC<SourceCardProps> = ({ source, score }) => (
  <div className="bg-white rounded-2xl shadow-md">
    {source.image_url && <SourceCardImage imageUrl={source.image_url} name={source.name} type={source.type} score={score} />}
    <SourceCardBody source={source} />
  </div>
);

export default SourceCard;
