import { ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

enum ETextError {
  CAUGHT_ERR = 'ErrorBoundary caught an error',
  UI_ERR = 'Oooops. An unexpected error occurred. Restart the application!',
  FETCH_ERR = 'Error fetch data',
  TRIGGER_ERR = 'Triggered Error',
  NETWORK_ERR = 'Network not ok',
  LOCALSTORAGE_ERR = 'Error parsing localStorage value for key',
}

export { ETextError };
export type { IErrorBoundaryProps, IErrorBoundaryState };
