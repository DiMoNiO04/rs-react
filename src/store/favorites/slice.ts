import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesSliceState } from './types';
import getFavoritesFromLs from '../../utils/getFavoritesFromLs';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { ICardProps } from '../../components/Card/types';

const initialState: IFavoritesSliceState = {
  items: getFavoritesFromLs(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<ICardProps>) {
      const card = action.payload;
      if (state.items.some((item) => item.url === card.url)) {
        state.items = state.items.filter((item) => item.url !== card.url);
      } else {
        state.items.push(card);
      }
      localStorage.setItem(EStorageKeys.FAVORITES, JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      localStorage.removeItem(EStorageKeys.FAVORITES);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
