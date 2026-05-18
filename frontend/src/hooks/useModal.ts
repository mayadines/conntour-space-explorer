import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const Modal: FC<{ children: ReactNode }> = ({ children }) => {
    if (!isOpen) return null;
    return createPortal(children, document.body);
  };

  return { isOpen, open, close, Modal };
};

export default useModal;
