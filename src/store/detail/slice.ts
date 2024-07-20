import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { IDetailSlice } from './types';
import getInitialDetailId from '../../utils/getInitialDetailId';
import { setDataStorage } from '../../utils/localeStorage';

const initialState: IDetailSlice = {
  detailId: getInitialDetailId(),
  isOpenBlock: getInitialDetailId() ? true : false,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetailId(state, action: PayloadAction<string>) {
      state.detailId = action.payload;
      setDataStorage(EStorageKeys.DETAIL, state.detailId);
      action.payload ? (state.isOpenBlock = true) : (state.isOpenBlock = false);
    },
  },
});

export const { setDetailId } = detailSlice.actions;
export default detailSlice.reducer;
