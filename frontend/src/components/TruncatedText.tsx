import { FC } from 'react';
import Tooltip from './Tooltip';

interface Props {
  text: string;
  variant: 'title' | 'description';
}

const styles = {
  title: {
    className: 'font-bold text-gray-900 text-lg leading-snug truncate',
    tooltipWidth: 'max-w-xs',
  },
  description: {
    className: 'text-gray-600 text-sm line-clamp-2',
    tooltipWidth: 'max-w-sm',
  },
};

const TruncatedText: FC<Props> = ({ text, variant }) => {
  const { className, tooltipWidth } = styles[variant];
  const Tag: 'h2' | 'p' = variant === 'title' ? 'h2' : 'p';

  return (
    <Tooltip text={text} maxWidth={tooltipWidth}>
      <Tag className={className}>{text}</Tag>
    </Tooltip>
  );
};

export default TruncatedText;
