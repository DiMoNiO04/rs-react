import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STR } from '../../utils/consts';
import { EStorageKeys } from '../../hooks/useLocaleStorage';
import { IDetailSlice } from './types';

const initialState: IDetailSlice = {
  detailId: EMPTY_STR,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetailId(state, action: PayloadAction<string>) {
      state.detailId = action.payload;
      localStorage.setItem(EStorageKeys.DETAIL, state.detailId);
    },
  },
});

export const { setDetailId } = detailSlice.actions;
export default detailSlice.reducer;
