import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesSliceState } from './types';
import getFavoritesFromLs from '../../utils/getFavoritesFromLs';
import { EStorageKeys } from '../../hooks/useLocaleStorage';

const initialState: IFavoritesSliceState = {
  items: getFavoritesFromLs(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const url: string = action.payload;
      if (state.items.find((item) => item.url === url)) {
        state.items = state.items.filter((item) => item.url !== url);
      } else {
        state.items.push({ url });
      }
      localStorage.setItem(EStorageKeys.FAVORITES, JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
