import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeContext, { ETheme } from '../context/themeContext';
import Search from '../components/Search/Search';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockImplementation((key) => {
      if (key === 'search') return 'Test';
      return null;
    }),
  }),
}));

describe('Search Component', () => {
  it('should render the search title and input field', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Search isFetching={false} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/Search peoples for StarWars/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search peoples/)).toBeInTheDocument();
  });

  it('should update the input value when typed into', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Search isFetching={false} />
      </ThemeContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search peoples/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input.value).toBe('Luke');
  });
});
