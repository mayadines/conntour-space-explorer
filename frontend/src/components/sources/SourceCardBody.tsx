import { FC } from 'react';
import TruncatedText from '../ui/TruncatedText';
import SourceCardHeader from './SourceCardHeader';
import SourceLaunchDate from './SourceLaunchDate';
import Button from '../ui/Button';
import SourceImageModal from './SourceImageModal';
import useModal from '../../hooks/useModal';
import { SourceCardBodyProps } from './types';

const SourceCardBody: FC<SourceCardBodyProps> = ({ source }) => {
  const { open, close, Modal } = useModal();

  return (
    <div className="p-4">
      <SourceCardHeader name={source.name} status={source.status} />
      {source.launch_date && <SourceLaunchDate date={source.launch_date} />}
      <hr className="mb-3" />
      <TruncatedText text={source.description} variant="description" />
      {source.image_url && (
        <div className="flex justify-end mt-4">
          <Button onClick={open}>View Full Image</Button>
        </div>
      )}
      <Modal>
        <SourceImageModal source={source} onClose={close} />
      </Modal>
    </div>
  );
};

export default SourceCardBody;
