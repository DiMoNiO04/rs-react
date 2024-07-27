import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites/slice';
import themeReducer from './theme/slice';
import paginationReducer from './pagination/slice';
import detailReducer from './detail/slice';
import searchReducer from './search/slice';
import { api } from './api/api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const rootReducer = combineReducers({
  theme: themeReducer,
  favorites: favoritesReducer,
  pagination: paginationReducer,
  detail: detailReducer,
  search: searchReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
