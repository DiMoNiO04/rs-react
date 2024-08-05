import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchSliceState } from './types';
import { EStorageKeys, setDataStorage } from '../../utils/localeStorage';
import { EMPTY_STR } from '../../utils/consts';

const initialState: ISearchSliceState = {
  search: EMPTY_STR,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      setDataStorage(EStorageKeys.SEARCH, state.search);
    },
  },
});

export const { setCurrentSearch } = searchSlice.actions;
export default searchSlice.reducer;
