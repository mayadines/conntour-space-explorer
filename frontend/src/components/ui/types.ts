import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface TooltipProps {
  text: string;
  children: ReactNode;
  maxWidth?: string;
}

export interface TruncatedTextProps {
  text: string;
  variant: 'title' | 'description';
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: 'default' | 'icon';
}
