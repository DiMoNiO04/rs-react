import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IMainContentProps } from '../components/MainContent/types';
import MainContent from '../components/MainContent/MainContent';
import { store } from '../store/store';
import { Provider } from 'react-redux';

vi.mock('next/router', () => {
  const events = {
    on: vi.fn(),
    off: vi.fn(),
  };
  return {
    useRouter: () => ({
      pathname: '/1',
      query: {},
      push: vi.fn(),
    }),
    Router: {
      events,
    },
  };
});

describe('MainContent Component', () => {
  const mockProps: IMainContentProps = {
    dataCard: null,
    data: {
      count: 0,
      results: [],
    },
  };

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <MainContent {...mockProps} />
      </Provider>
    );
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('should render the Pagination when data.count is greater than 0 and not loading', () => {
    const propsWithCount: IMainContentProps = {
      ...mockProps,
      data: {
        count: 5,
        results: [
          {
            url: 'https://example.com/1',
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            gender: 'male',
          },
          {
            url: 'https://example.com/2',
            name: 'Darth Vader',
            height: '202',
            mass: '136',
            birth_year: '41.9BBY',
            gender: 'male',
          },
        ],
      },
    };

    render(
      <Provider store={store}>
        <MainContent {...propsWithCount} />
      </Provider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('41.9BBY')).toBeInTheDocument();
    expect(screen.getByText('202')).toBeInTheDocument();
  });
});
