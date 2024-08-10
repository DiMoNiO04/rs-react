import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailContent from '../components/DetailContent/DetailContent';
import { IDetailFetch } from '../components/DetailContent/types';
import { EDetailData } from '../components/DetailContent/types';
import React from 'react';
import { getDataStorage } from '../utils/localeStorage';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    toString: () => 'mock-search-params',
  }),
}));

vi.mock('../utils/localeStorage', () => ({
  EStorageKeys: {
    DETAIL: 'DETAIL',
  },
  getDataStorage: vi.fn(),
  setDataStorage: vi.fn(),
}));

const mockDataCard: IDetailFetch = {
  url: 'https://example.com',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
  eye_color: '',
  hair_color: '',
};

describe('DetailContent Component', () => {
  it('should render detail information when dataCard and detail are available', () => {
    (getDataStorage as jest.Mock).mockReturnValue('mock-detail-id');

    render(<DetailContent dataCard={mockDataCard} />);

    expect(screen.getByText(mockDataCard.name)).toBeInTheDocument();
    expect(screen.getByText(mockDataCard.height)).toBeInTheDocument();
    expect(screen.getByText(mockDataCard.mass)).toBeInTheDocument();
    expect(screen.getByText(mockDataCard.birth_year)).toBeInTheDocument();
    expect(screen.getByText(mockDataCard.gender)).toBeInTheDocument();
  });

  it('should not render any details if dataCard is missing', () => {
    (getDataStorage as jest.Mock).mockReturnValue('mock-detail-id');

    render(<DetailContent dataCard={null} />);

    expect(screen.queryByText(EDetailData.NAME)).not.toBeInTheDocument();
  });

  it('should not render any details if detail is missing', () => {
    (getDataStorage as jest.Mock).mockReturnValue(null);

    render(<DetailContent dataCard={mockDataCard} />);

    expect(screen.queryByText(EDetailData.NAME)).not.toBeInTheDocument();
  });

  it('should not render any details if isClient is false', () => {
    vi.spyOn(React, 'useState').mockReturnValue([false, vi.fn()]);

    render(<DetailContent dataCard={mockDataCard} />);

    expect(screen.queryByText(EDetailData.NAME)).not.toBeInTheDocument();
  });
});
