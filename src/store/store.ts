import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/slice';
import paginationReducer from './pagination/slice';
import searchReducer from './search/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  pagination: paginationReducer,
  search: searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
