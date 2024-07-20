import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STR } from '../../utils/consts';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { IDetailSlice } from './types';
import getInitialDetailId from '../../utils/getInitialDetailId';

const initialState: IDetailSlice = {
  detailId: getInitialDetailId(),
  isOpenBlock: getInitialDetailId() !== EMPTY_STR,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetailId(state, action: PayloadAction<string>) {
      state.detailId = action.payload;
      localStorage.setItem(EStorageKeys.DETAIL, state.detailId);
      state.isOpenBlock = true;
    },
    clearDetailId(state) {
      state.detailId = EMPTY_STR;
      localStorage.removeItem(EStorageKeys.DETAIL);
      state.isOpenBlock = false;
    },
  },
});

export const { setDetailId, clearDetailId } = detailSlice.actions;
export default detailSlice.reducer;
