import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404';

describe('NotFound Page', () => {
  it('should render the NotFoundContent component', () => {
    render(<NotFound />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
