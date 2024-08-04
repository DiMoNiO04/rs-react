'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ErrorBoundary from '../errors/ErrorBoundary';

const ProviderApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div id="root">{children}</div>
      </ErrorBoundary>
    </Provider>
  );
};

export default ProviderApp;
