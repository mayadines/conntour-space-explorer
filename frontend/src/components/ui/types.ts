import { ReactNode } from 'react';

export interface TooltipProps {
  text: string;
  children: ReactNode;
  maxWidth?: string;
}

export interface TruncatedTextProps {
  text: string;
  variant: 'title' | 'description';
}

export interface ButtonProps {
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}
