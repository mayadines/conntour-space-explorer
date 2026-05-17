import { FC } from 'react';
import Tooltip from './Tooltip';

interface Props {
  text: string;
  variant: 'title' | 'description';
}

const styles = {
  title: {
    text: 'font-bold text-gray-900 text-lg leading-snug truncate',
    tooltipWidth: 'max-w-xs',
  },
  description: {
    text: 'text-gray-600 text-sm line-clamp-2',
    tooltipWidth: 'max-w-sm',
  },
};

const TruncatedText: FC<Props> = ({ text, variant }) => {
  const { text: textClass, tooltipWidth } = styles[variant];
  const Tag = variant === 'title' ? 'h2' : 'p';

  return (
    <Tooltip text={text} maxWidth={tooltipWidth}>
      <Tag className={textClass}>{text}</Tag>
    </Tooltip>
  );
};

export default TruncatedText;
