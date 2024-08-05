import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchSliceState } from './types';
import getInitialSearch from '../../utils/getInitialSearch';
import { EStorageKeys, setDataStorage } from '../../utils/localeStorage';

const initialState: ISearchSliceState = {
  search: getInitialSearch(),
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
