import { RootState } from '../store';

export const selectorGetDetailId = () => (state: RootState) => state.detail.detailId;
export const selectorGetIsOpenBlock = () => (state: RootState) => state.detail.isOpenBlock;
