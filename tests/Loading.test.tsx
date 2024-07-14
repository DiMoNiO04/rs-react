import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../src/components/Loading/Loading';

describe('Loading Component', () => {
  it('should render Loading gif', () => {
    render(<Loading />);
    const imgEl = screen.getByAltText(/loading/i);
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', './loading.gif');
  });
});
