import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaginationSliceState } from './types';
import { EStorageKeys, setDataStorage } from '../../utils/localeStorage';
import getInitialPage from '../../utils/getInitialPage';

const initialState: IPaginationSliceState = {
  currentPage: getInitialPage(),
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
