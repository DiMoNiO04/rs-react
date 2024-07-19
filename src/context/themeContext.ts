import { createContext } from 'react';

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeContext = createContext<ETheme | string>(ETheme.LIGHT);

export default ThemeContext;
