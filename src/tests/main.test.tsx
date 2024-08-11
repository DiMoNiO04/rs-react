import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ErrorBoundary from '../errors/ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('index.tsx', () => {
  it('should catches errors with ErrorBoundary', () => {
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>
      </Provider>
    );

    expect(screen.getByText(/Oooops/i)).toBeInTheDocument();
  });
});
