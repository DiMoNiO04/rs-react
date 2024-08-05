import { createSlice } from '@reduxjs/toolkit';
import { ETheme } from '../../context/themeContext';
import { IThemeState } from './types';
import { EStorageKeys, getDataStorage, setDataStorage } from '../../utils/localeStorage';

const initialState: IThemeState = {
  value: getDataStorage(EStorageKeys.THEME) || ETheme.LIGHT,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
      setDataStorage(EStorageKeys.THEME, state.value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
