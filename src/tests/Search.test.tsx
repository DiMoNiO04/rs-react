import React from 'react';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { RootState } from '../store/store';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeContext, { ETheme } from '../context/themeContext';
import SearchComponent from '../components/Serch/Searh';

const PLACEHOLDER = 'Search peoples';
const handleSearch = vi.fn();

const mockStore = configureStore<Partial<RootState>>([]);
const store = mockStore({
  search: {
    search: 'search',
  },
});

const mockDispatch = vi.fn();
vi.mock('../store/store.ts', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) => selector(store.getState() as RootState),
}));

describe('SearchComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with initial input value from store', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <SearchComponent handleSearch={handleSearch} isFetching={false} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toHaveValue('search');
  });

  it('should handle input change', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <SearchComponent handleSearch={handleSearch} isFetching={false} />
        </ThemeContext.Provider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    expect(input).toHaveValue('Luke Skywalker');
  });

  it('should handles search button click', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <SearchComponent handleSearch={handleSearch} isFetching={false} />
        </ThemeContext.Provider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(screen.getByText('Search'));
    expect(handleSearch).toHaveBeenCalledWith('Luke Skywalker');
  });

  it('should search button is disabled when isFetching is true', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <SearchComponent handleSearch={handleSearch} isFetching={true} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Search')).toBeDisabled();
  });
});
