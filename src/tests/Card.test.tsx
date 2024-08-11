import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleFavorite } from '../store/favorites/slice';
import ThemeContext, { ETheme } from '../context/themeContext';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card/Card';

vi.mock('../store/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../store/favorites/slice', () => ({
  toggleFavorite: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/1',
    query: {},
    push: vi.fn(),
  }),
}));

const mockData = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card Component', () => {
  it('should render card data correctly', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Card {...mockData} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.height)).toBeInTheDocument();
    expect(screen.getByText(mockData.mass)).toBeInTheDocument();
    expect(screen.getByText(mockData.birth_year)).toBeInTheDocument();
    expect(screen.getByText(mockData.gender)).toBeInTheDocument();
  });

  it('should toggle favorite state when checkbox is clicked', () => {
    const dispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Card {...mockData} />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(dispatch).toHaveBeenCalledWith(toggleFavorite(mockData));
  });
});
