import { FC } from 'react';
import SourceTypeBadge from './SourceTypeBadge';
import SourceScoreBadge from './SourceScoreBadge';
import { SourceCardImageProps } from './types';

const SourceCardImage: FC<SourceCardImageProps> = ({ imageUrl, name, type, score }) => (
  <div className="relative overflow-hidden rounded-t-2xl">
    <img src={imageUrl} alt={name} loading="lazy" className="w-full h-52 object-cover" />
    <SourceTypeBadge type={type} />
    {!!score && <SourceScoreBadge score={score} />}
  </div>
);

export default SourceCardImage;
