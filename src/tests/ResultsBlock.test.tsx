import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsBlock from '../components/ResultsBlock/ResultsBlock';
import ThemeContext, { ETheme } from '../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { search: 'Luke' },
  }),
}));

const mockCards = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
  },
];

describe('ResultsBlock', () => {
  it('should display the search query in the title', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <ResultsBlock cards={[]} isFetching={false} />
      </ThemeContext.Provider>
    );

    const titleElement = screen.getByText('Found peoples matching your request:');
    const searchTextElement = within(titleElement).getByText('Luke');

    expect(titleElement).toBeInTheDocument();
    expect(searchTextElement).toBeInTheDocument();
  });

  it('should display no results message if no cards are found', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <ResultsBlock cards={[]} isFetching={false} />
      </ThemeContext.Provider>
    );

    const noResultsElement = screen.getByText(/No results were found for your request/);
    const searchTextElement = within(noResultsElement).getByText('Luke');

    expect(noResultsElement).toBeInTheDocument();
    expect(searchTextElement).toBeInTheDocument();
    expect(screen.getByText(/Try again!/)).toBeInTheDocument();
  });

  it('should render list of cards when cards are available', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={ETheme.LIGHT}>
          <ResultsBlock cards={mockCards} isFetching={false} />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
