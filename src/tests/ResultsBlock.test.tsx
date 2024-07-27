import React from 'react';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { RootState } from '../store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeContext, { ETheme } from '../context/themeContext';
import ResultsBlock from '../components/ResultsBlock/ResultsBlock';
import { MemoryRouter } from 'react-router-dom';

const defaultProps = {
  cards: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
      birth_year: '41.9BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/11/',
    },
    {
      name: 'Shmi Skywalker',
      height: '163',
      mass: 'unknown',
      birth_year: '72BBY',
      gender: 'female',
      url: 'https://swapi.dev/api/people/43/',
    },
  ],
  isFetching: false,
  searchValue: 'Skywalker',
};

const mockStore = configureStore<Partial<RootState>>([]);
const store = mockStore({
  search: {
    search: 'search',
  },
  favorites: {
    items: [],
  },
});

const mockDispatch = vi.fn();
vi.mock('../store/store.ts', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) => selector(store.getState() as RootState),
}));

describe('ResultsBlock Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <MemoryRouter>
            <ResultsBlock {...defaultProps} isFetching={true} />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    const imgEl = screen.getByAltText(/loading/i);
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', './loading.gif');
  });

  it('should render list of cards', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <MemoryRouter>
            <ResultsBlock {...defaultProps} />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText(defaultProps.cards[0].name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.cards[1].name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.cards[2].name)).toBeInTheDocument();
  });

  it('should render no results message when no cards found', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <MemoryRouter>
            <ResultsBlock {...defaultProps} cards={[]} />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('should render "All" when searchValue is empty', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <MemoryRouter>
            <ResultsBlock {...defaultProps} searchValue="" />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Found peoples matching your request:')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});
