import { Component, ErrorInfo, ReactNode } from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from './types';
import ErrorContent from '../ErrorContent/ErrorContent';

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorContent />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
