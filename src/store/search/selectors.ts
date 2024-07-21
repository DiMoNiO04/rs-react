import { RootState } from '../store';

export const selectorCurrentSearch = () => (state: RootState) => state.search.search;
