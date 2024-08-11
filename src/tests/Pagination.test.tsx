import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import ThemeContext, { ETheme } from '../context/themeContext';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockImplementation((key) => {
      if (key === 'search') return 'Luke';
      return null;
    }),
  }),
}));

const mockPush = vi.fn();
const mockRouter = {
  pathname: '/test',
  query: { page: '1' },
  push: mockPush,
};

describe('Pagination Component', () => {
  it('should render the Pagination component correctly', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Pagination count={100} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Page:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should disable "Previous" button on the first page', () => {
    mockRouter.query.page = '1';

    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Pagination count={100} />
      </ThemeContext.Provider>
    );

    const prevButton = screen.getByTestId('btn-prev');
    expect(prevButton).toBeDisabled();
  });

  it('should enable "Next" button if not on the last page', () => {
    mockRouter.query.page = '1';

    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <Pagination count={100} />
      </ThemeContext.Provider>
    );

    const nextButton = screen.getByTestId('btn-next');
    expect(nextButton).not.toBeDisabled();
  });
});
