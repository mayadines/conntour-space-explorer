import { FC, ReactNode } from 'react';

interface Props {
  text: string;
  children: ReactNode;
  maxWidth?: string;
}

const Tooltip: FC<Props> = ({ text, children, maxWidth = 'max-w-xs' }) => (
  <div className="relative group min-w-0">
    {children}
    <div className={`absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg ${maxWidth} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg`}>
      {text}
      <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-800" />
    </div>
  </div>
);

export default Tooltip;
