import { RootState } from '../store';

export const getCountries = () => (state: RootState) => state.countries;
