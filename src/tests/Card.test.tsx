import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../components/Card/Card';

const cardProps = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card component', () => {
  it('should render component with correct data', () => {
    render(
      <MemoryRouter>
        <Card {...cardProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(cardProps.name)).toBeInTheDocument();
    expect(screen.getByText(cardProps.height)).toBeInTheDocument();
    expect(screen.getByText(cardProps.mass)).toBeInTheDocument();
    expect(screen.getByText(cardProps.birth_year)).toBeInTheDocument();
    expect(screen.getByText(cardProps.gender)).toBeInTheDocument();
  });
});
