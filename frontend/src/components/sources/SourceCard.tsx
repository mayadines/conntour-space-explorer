import { FC } from 'react';
import { createPortal } from 'react-dom';
import useModal from '../../hooks/useModal';
import TruncatedText from '../ui/TruncatedText';
import { SourceCardProps } from './types';

const SourceCard: FC<SourceCardProps> = ({ source, score }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md">
        <div className="relative overflow-hidden rounded-t-2xl">
          {source.image_url && (
            <img
              src={source.image_url}
              alt={source.name}
              loading="lazy"
              className="w-full h-52 object-cover"
            />
          )}
          <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
            {source.type}
          </span>
          {score && (
            <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              ★ {score}
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <TruncatedText text={source.name} variant="title" />
            <span className="text-green-500 text-xs font-medium shrink-0 mt-1">✓ {source.status}</span>
          </div>

          <p className="text-gray-400 text-sm mb-3">
            📅 <span className="text-gray-500 font-medium">Launch Date:</span> {source.launch_date && new Date(source.launch_date).toLocaleDateString()}
          </p>

          <hr className="mb-3" />

          <div className="mb-4">
            <TruncatedText text={source.description} variant="description" />
          </div>

          {source.image_url && (
            <div className="flex justify-end">
              <button
                onClick={open}
                className="border border-blue-500 text-blue-500 text-sm px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                View Full Image
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={close}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl mx-4 max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={source.name}
          >
            <div className="flex items-center justify-between mb-4">
              <TruncatedText text={source.name} variant="title" />
              <button
                onClick={close}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <img
              src={source.image_url ?? ''}
              alt={source.name}
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SourceCard;
