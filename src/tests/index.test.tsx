import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../pages';

vi.mock('../components/MainContent/MainContent', () => ({
  __esModule: true,
  default: () => <div>Main Content</div>,
}));

describe('Home Page', () => {
  it('should render the MainContent component', () => {
    render(<Home data={null} />);

    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});
