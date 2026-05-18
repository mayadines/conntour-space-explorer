import { FC } from 'react';
import TruncatedText from '../ui/TruncatedText';
import Button from '../ui/Button';
import { CloseIcon } from '../ui/icons/index';
import { SourceImageModalProps } from './types';

const SourceImageModal: FC<SourceImageModalProps> = ({ source, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
    <div
      className="relative bg-white rounded-2xl shadow-2xl mx-4 max-w-2xl w-full p-6"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={source.name}
    >
      <div className="flex items-center justify-between mb-4">
        <TruncatedText text={source.name} variant="title" />
        <Button variant="icon" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </Button>
      </div>
      <img src={source.image_url ?? ''} alt={source.name} className="w-full max-h-[70vh] object-contain rounded-lg" />
    </div>
  </div>
);

export default SourceImageModal;
