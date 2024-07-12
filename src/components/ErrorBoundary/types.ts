import { ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export type { IErrorBoundaryProps, IErrorBoundaryState };
