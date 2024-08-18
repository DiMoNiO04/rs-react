import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import countries, { ICountryType } from './data';

const initialState = countries;

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<ICountryType[]>) {
      state = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
