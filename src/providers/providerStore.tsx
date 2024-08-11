'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ErrorBoundary from '../errors/ErrorBoundary';

const ProviderStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  );
};

export default ProviderStore;
