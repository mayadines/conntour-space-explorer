import { Source } from '../../api/sources';

export interface SourceCardProps {
  source: Source;
  score?: number;
}

export interface SourceCardImageProps {
  imageUrl: string;
  name: string;
  type: string;
  score?: number;
}

export interface SourceCardBodyProps {
  source: Source;
}

export interface SourceImageModalProps {
  source: Source;
  onClose: () => void;
}

export interface SourceTypeBadgeProps {
  type: string;
}

export interface SourceScoreBadgeProps {
  score: number;
}

export interface SourceStatusProps {
  status: string;
}

export interface SourceLaunchDateProps {
  date: string;
}

export interface SourceCardHeaderProps {
  name: string;
  status: string;
}
