import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProviderTheme from '../providers/providerTheme';
import ThemeContext, { ETheme } from '../context/themeContext';
import { getDataStorage, setDataStorage } from '../utils/localeStorage';

vi.mock('../utils/localeStorage', () => ({
  __esModule: true,
  getDataStorage: vi.fn(),
  setDataStorage: vi.fn(),
  EStorageKeys: {
    THEME: 'theme',
  },
}));

vi.mock('../components/BtnTheme/BtnTheme', () => ({
  __esModule: true,
  default: ({ theme, onClick }: { theme: ETheme; onClick: () => void }) => (
    <button onClick={onClick}>{theme === ETheme.LIGHT ? 'Switch to Dark' : 'Switch to Light'}</button>
  ),
}));

describe('ProviderTheme', () => {
  beforeEach(() => {
    (getDataStorage as jest.Mock).mockReturnValue(ETheme.LIGHT);
    (setDataStorage as jest.Mock).mockClear();
  });

  it('should render children correctly and provide theme context', () => {
    render(
      <ProviderTheme>
        <ThemeContext.Consumer>{(theme) => <div data-testid="theme-value">{theme}</div>}</ThemeContext.Consumer>
      </ProviderTheme>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent(ETheme.LIGHT);
  });

  it('should use initial theme from local storage', () => {
    (getDataStorage as jest.Mock).mockReturnValue(ETheme.DARK);

    render(
      <ProviderTheme>
        <ThemeContext.Consumer>{(theme) => <div data-testid="theme-value">{theme}</div>}</ThemeContext.Consumer>
      </ProviderTheme>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent(ETheme.DARK);
  });
});
