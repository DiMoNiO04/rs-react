import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaginationSliceState } from './types';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { FIRST_PAGE } from '../../utils/consts';
import { setDataStorage } from '../../utils/localeStorage';

const initialState: IPaginationSliceState = {
  currentPage: FIRST_PAGE,
  totalPage: 0,
  count: 10,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    handlePrevPage(state) {
      state.currentPage--;
      setDataStorage(EStorageKeys.PAGE, String(state.currentPage));
    },
    handleNextPage(state) {
      state.currentPage++;
      setDataStorage(EStorageKeys.PAGE, String(state.currentPage));
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalPage = Math.ceil(action.payload / state.count);
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      setDataStorage(EStorageKeys.PAGE, String(state.currentPage));
    },
  },
});

export const { handlePrevPage, handleNextPage, setTotalCount, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
