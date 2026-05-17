import { FC, ReactNode, useRef, useState } from 'react';

interface Props {
  text: string;
  children: ReactNode;
  maxWidth?: string;
}

const Tooltip: FC<Props> = ({ text, children, maxWidth = 'max-w-xs' }) => {
  const [visible, setVisible] = useState(false);
  const [above, setAbove] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setAbove(rect.top > window.innerHeight - rect.bottom);
    }
    setVisible(true);
  };

  return (
    <div
      className="relative min-w-0"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute ${above ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg ${maxWidth} z-20 shadow-lg`}
        >
          {text}
          <div
            className={`absolute left-4 border-4 border-transparent ${above ? 'top-full border-t-gray-800' : 'bottom-full border-b-gray-800'}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
