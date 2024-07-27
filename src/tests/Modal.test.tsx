import React from 'react';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeContext, { ETheme } from '../context/themeContext';
import Modal from '../components/Modal/Modal';
import { RootState } from '../store/store';

const mockStore = configureStore([]);
const store = mockStore({
  favorites: {
    count: 3,
    items: [],
  },
});
const emptyStore = mockStore({
  favorites: {
    count: 0,
    items: [],
  },
});

const mockDispatch = vi.fn();
vi.mock('../store/store.ts', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) => selector(store.getState() as RootState),
}));

describe('Modal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should no render if no favorites', () => {
    render(
      <Provider store={emptyStore}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <Modal />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.queryByText(/item selected/i)).toBeNull();
  });

  it('should render with success count items', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <Modal />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.queryByText('3 item selected')).toBeNull();
  });
});
