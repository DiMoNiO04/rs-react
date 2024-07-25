import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsBlock from '../components/ResultsBlock/ResultsBlock';
import { MemoryRouter } from 'react-router-dom';

const dataCards = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
];

describe('ResultsBlock Component', () => {
  it('should render loading component when isLoading is true', () => {
    render(
      <MemoryRouter>
        <ResultsBlock cards={[]} isLoading={true} searchValue="Luke Skywalker" />
      </MemoryRouter>
    );

    const loadingEl = screen.getByAltText(/loading/i);
    expect(loadingEl).toBeInTheDocument();
    expect(loadingEl).toHaveAttribute('src', './loading.gif');
  });

  it('should render "No results..." when cards is empty ', () => {
    render(
      <MemoryRouter>
        <ResultsBlock cards={[]} isLoading={false} searchValue="Luke Skywalker" />
      </MemoryRouter>
    );

    const textNoResults = screen.getByText(/no results/i);
    expect(textNoResults).toBeInTheDocument();
  });

  it('should display correct search value in the title', () => {
    const searchParam = 'Luke Skywalker';

    render(
      <MemoryRouter>
        <ResultsBlock cards={dataCards} isLoading={false} searchValue={searchParam} />
      </MemoryRouter>
    );

    const spanEl = screen.getByText(searchParam, { selector: 'span' });
    expect(spanEl).toBeInTheDocument();
  });

  it('should display correct search value in the title when searchParam empty', () => {
    render(
      <MemoryRouter>
        <ResultsBlock cards={dataCards} isLoading={false} searchValue="" />
      </MemoryRouter>
    );

    const spanEl = screen.getByText('All', { selector: 'span' });
    expect(spanEl).toBeInTheDocument();
  });

  it('should renders cards list', () => {
    render(
      <MemoryRouter>
        <ResultsBlock cards={dataCards} isLoading={false} searchValue="Skywalker" />
      </MemoryRouter>
    );

    const cardElements = screen.getAllByRole('listitem');
    expect(cardElements.length).toBe(dataCards.length);

    dataCards.forEach((card) => {
      const cardEl = screen.getByText(card.name);
      expect(cardEl).toBeInTheDocument();
    });
  });
});
