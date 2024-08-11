import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BtnTheme from '../components/BtnTheme/BtnTheme';
import { ETheme } from '../context/themeContext';

const mockOnClick = vi.fn();

describe('BtnTheme component', () => {
  it('should render with light theme', () => {
    render(<BtnTheme theme={ETheme.LIGHT} onClick={mockOnClick} />);

    expect(screen.getByText('Currently using: light theme')).toBeInTheDocument();
    expect(screen.getByText('dark theme')).toBeInTheDocument();
  });

  it('should render with dark theme', () => {
    render(<BtnTheme theme={ETheme.DARK} onClick={mockOnClick} />);

    expect(screen.getByText('Currently using: dark theme')).toBeInTheDocument();
    expect(screen.getByText('light theme')).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    render(<BtnTheme theme={ETheme.LIGHT} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Currently using: light theme')).toBeInTheDocument();
    expect(screen.getByText('dark theme')).toBeInTheDocument();
  });
});
