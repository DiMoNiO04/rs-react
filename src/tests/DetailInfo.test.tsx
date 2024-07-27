import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DetailInfo from '../components/DetailInfo/DetailInfo';

const handleClickClose = vi.fn();

const card = {
  name: 'Anakin Skywalker',
  height: '188',
  mass: '84',
  birth_year: '41.9BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/11/',
};

describe('DetailInfo Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render detail content', () => {
    render(
      <DetailInfo id="11" handleClickClose={handleClickClose}>
        <p>{card.name}</p>
      </DetailInfo>
    );

    expect(screen.getByText('Details for #11')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText(card.name)).toBeInTheDocument();
  });

  it('should call handleClickClose when clicking the close button', () => {
    render(
      <DetailInfo id="11" handleClickClose={handleClickClose}>
        <p>{card.name}</p>
      </DetailInfo>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(handleClickClose).toHaveBeenCalledTimes(1);
  });

  it('should not call handleClickClose when clicking inside the detail section', () => {
    render(
      <DetailInfo id="123" handleClickClose={handleClickClose}>
        <p>Details content</p>
      </DetailInfo>
    );

    fireEvent.click(screen.getByText('Details content'));
    expect(handleClickClose).not.toHaveBeenCalled();
  });
});
