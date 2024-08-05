import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/consts';
import { IDetailFetch, IFetchResponse, IGetFetch } from './types';
import { EStorageKeys } from '../../utils/localeStorage';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchCards: builder.query<IFetchResponse, IGetFetch>({
      query: ({ searchParam, pageParam }) => {
        const params = new URLSearchParams();
        if (searchParam) params.set(EStorageKeys.SEARCH, searchParam.trim());
        if (pageParam) params.set(EStorageKeys.PAGE, String(pageParam));
        return `?${params.toString()}`;
      },
    }),
    fetchCardPerson: builder.query<IDetailFetch, string>({
      query: (id) => `${id}/`,
    }),
  }),
});

export const { useFetchCardsQuery, useFetchCardPersonQuery } = api;
