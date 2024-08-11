import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ProviderStore from '../providers/providerStore';

vi.mock('../errors/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ProviderStore', () => {
  it('should render children correctly', () => {
    render(
      <ProviderStore>
        <div data-testid="child">Test Child</div>
      </ProviderStore>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Test Child');
  });

  it('should provide the Redux store context', () => {
    render(
      <ProviderStore>
        <Provider store={store}>
          <div>Redux Store Test</div>
        </Provider>
      </ProviderStore>
    );

    expect(screen.getByText('Redux Store Test')).toBeInTheDocument();
  });
});
