import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeContext, { ETheme } from '../context/themeContext';
import NotFoundContent from '../components/NotFoundContent/NotFoundContent';

describe('NotFoundContent Component', () => {
  it('should render 404', () => {
    render(
      <ThemeContext.Provider value={ETheme.LIGHT}>
        <NotFoundContent />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
