import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesSliceState } from './types';
import getFavoritesFromLs from '../../utils/getFavoritesFromLs';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { ICardProps } from '../../components/Card/types';
import { removeDataStorage, setDataStorage } from '../../utils/localeStorage';
import exportFromJSON from 'export-from-json';

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
      setDataStorage(EStorageKeys.FAVORITES, JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      removeDataStorage(EStorageKeys.FAVORITES);
    },
    downloadFavorites(state) {
      const data = state.items;
      const fileName = `${state.items.length}_peoples`;
      const exportType = exportFromJSON.types.csv;

      exportFromJSON({ data, fileName, exportType });
    },
  },
});

export const { toggleFavorite, clearFavorites, downloadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
