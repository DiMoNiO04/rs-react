import { RootState } from '../store';

export const selectorCurrentPage = () => (state: RootState) => state.pagination.currentPage;
export const selectorTotalPage = () => (state: RootState) => state.pagination.totalPage;
