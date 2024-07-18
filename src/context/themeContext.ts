import { createContext } from 'react';

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeContext = createContext(ETheme.LIGHT);

export default ThemeContext;
