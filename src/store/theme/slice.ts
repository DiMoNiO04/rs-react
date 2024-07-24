import { createSlice } from '@reduxjs/toolkit';
import { ETheme } from '../../context/themeContext';
import { IThemeState } from './types';
import { EStorageKeys } from '../../hooks/useLocaleStorage';

const initialState: IThemeState = {
  value: localStorage.getItem(EStorageKeys.THEME) || ETheme.LIGHT,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
      localStorage.setItem(EStorageKeys.THEME, state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
