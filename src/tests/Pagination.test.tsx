import React from 'react';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { RootState } from '../store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeContext, { ETheme } from '../context/themeContext';
import Pagination from '../components/Pagination/Pagination';

const mockStore = configureStore<Partial<RootState>>([]);
const store = mockStore({
  pagination: {
    currentPage: 1,
    totalPage: 5,
    count: 10,
  },
});
const lastPageStore = mockStore({
  pagination: {
    currentPage: 5,
    totalPage: 5,
    count: 10,
  },
});

const mockDispatch = vi.fn();
vi.mock('../../store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) => selector(store.getState() as RootState),
}));

describe('Pagination Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with correct page numbers', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <Pagination />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable "Previous" button on the first page', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <Pagination />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('btn-prev')).toBeDisabled();
  });

  it('should disable "Next" button on the last page', () => {
    render(
      <Provider store={lastPageStore}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <Pagination />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('btn-next')).toBeDisabled();
  });
});
