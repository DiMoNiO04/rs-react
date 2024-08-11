import { ETheme } from '../../context/themeContext';

interface IBtnTheme {
  theme: string | ETheme;
  onClick: () => void;
}

export type { IBtnTheme };
